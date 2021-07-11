const express = require('express');
const app = express();
const PORT = process.env.PORT || process.argv[2];
const { Blockchain } = require('./blockchain');
const { default: axios } = require('axios');
const test = require('./test');
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const Blocks = new Blockchain();

/*Middleware */

app.use(express.json());


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

/*  Routes */

app.get('/blockchain', (req, res) => {
    res.json(Blocks)
});

app.get('/mine', async (req, res) => {


    const previousBlockHash = Blocks.getLastBlock()['hash'];
    const currentBlockData = {
        transactions: Blocks.pendingTransactions,
        index: Blocks.getLastBlock()['index'] + 1
    };
    const nonce = Blocks.proofOfWork(previousBlockHash, currentBlockData);

    const blockHash = Blocks.hashBlock(previousBlockHash, currentBlockData, nonce);



    const newBlock = Blocks.createNewBlock(nonce, previousBlockHash, blockHash);
    const requests = [];
    Blocks.NetworkNodes.map(url => {
        let call = axios.post(url + '/receive-new-block', { newBlock }, config);

        requests.push(call)
    });

    await Promise.all(requests);

    /* Reward */

    /* Broadcast reward to all nodes */
    await axios.post(Blocks.NodeURL + '/transaction/broadcast', {
        amount: 12.5,
        sender: '00',
        recipient: Blocks.NodeAddress
    }, config);


    res.json({ message: 'New block mined and broadcasted successfully.', newBlock })

});


app.post('/receive-new-block', (req, res) => {
    const { newBlock } = req.body;
    const lastBlock = Blocks.getLastBlock();
    const HashIsCorrect = lastBlock.hash === newBlock.previousBlockHash;

    const IndexIsCorrect = lastBlock['index'] + 1 === newBlock['index'];
    if (HashIsCorrect && IndexIsCorrect) {

        /* Accept the Block */
        Blocks.chain.push(newBlock);
        Blocks.pendingTransactions = [];
        res.json({
            message:'Block accepted.',newBlock
        })

    }else{
        res.json({
            message:'Block rejected.',newBlock
        })
    }
})


/* Create a new transaction */
app.post('/transaction', (req, res) => {
    const { newTransaction } = req.body
    /*Add to pendingTransaction on this node */
    const BlockIndex = Blocks.addTransactionToPendingTransactions(newTransaction);



    res.json(`Transaction will be recorded in block ${BlockIndex}`)

});


/* Create a transaction on the current node and broadcast to others */
app.post('/transaction/broadcast', async (req, res) => {

    try {
        const { amount, sender, recipient, key } = req.body;
        /* This step is not supposed to be carried out on the node */
        const privatekey = ec.keyFromPrivate(key);
        const walletAdrress = privatekey.getPublic('hex');
        const newTransaction = Blocks.createNewTransaction(amount, walletAdrress, recipient,privatekey);

        

        /*Add to pendingTransaction on this node */
        Blocks.addTransactionToPendingTransactions(newTransaction);

        /* Broadcast to other nodes on the network*/
        const requests = [];
        Blocks.NetworkNodes.map(url => {
            let call = axios.post(url + '/transaction', { newTransaction }, config);

            requests.push(call)
        });

        await Promise.all(requests);
        res.json('Transaction created and broacasted successfully.')
    } catch (error) {
        console.log(error)
    }
});


/*Register and broadcast a node to the network */
app.post('/register-and-broadcast-node', async (req, res) => {

    try {
        const { newNodeUrl } = req.body;
        if (Blocks.NetworkNodes.indexOf(newNodeUrl) == -1 && newNodeUrl !== Blocks.NodeURL) {
            Blocks.NetworkNodes.push(newNodeUrl)
        };

        /*Broadcast to other nodes */
        const NetworkNodesUrl = Blocks.NetworkNodes.filter(url => url !== newNodeUrl);
        const requests = [];
        NetworkNodesUrl.map((url) => {
            let call = axios.post(url + '/register-node', { newNodeUrl }, config);

            requests.push(call)
        });


        await Promise.all(requests);
        await axios.post(newNodeUrl + '/register-nodes-bulk', { allNetworkNodes: [...NetworkNodesUrl, Blocks.NodeURL] }, config);

        res.json('New node registration successful.')
    } catch (error) {
        console.log(error)
    }

});


/*Register a node */
app.post('/register-node', (req, res) => {

    const { newNodeUrl } = req.body;
    if (Blocks.NetworkNodes.indexOf(newNodeUrl) == -1 && newNodeUrl !== Blocks.NodeURL) {
        Blocks.NetworkNodes.push(newNodeUrl)
    };

    res.json('New node registered successfully.')

});

/*Register multiple nodes at once */
app.post('/register-nodes-bulk', (req, res) => {

    const { allNetworkNodes } = req.body;

    allNetworkNodes.map(newNodeUrl => {
        if (Blocks.NetworkNodes.indexOf(newNodeUrl) == -1 && newNodeUrl !== Blocks.NodeURL) {
            Blocks.NetworkNodes.push(newNodeUrl)
        };
    });


    res.json('Bulk registration successful.')





});


app.get('/consensus', async (req,res)=>{

    try {
        /* Get the copy of all node chains */
    const requests = [];
    Blocks.NetworkNodes.map(url => {
        let call = axios.get(url + '/blockchain');

        requests.push(call)
    });

    let response = await Promise.all(requests);

    const currentBlockchainLength = Blocks.chain.length;
    let maxChainLength = currentBlockchainLength;
    let newLongestchain = null;
    let newPendingTransactions = null;
    response.map(({data:{chain,pendingTransactions}})=>{
        if(chain.length > maxChainLength){
            maxChainLength = chain.length;
            newLongestchain = chain;
            newPendingTransactions = pendingTransactions;
        }
    });

    if(!newLongestchain || (newLongestchain && !Blocks.chainIsValid(newLongestchain))){

        res.json({
            message:'Current chain has not been replaced.',
            chain:Blocks.chain
        });

    }else if(newLongestchain && Blocks.chainIsValid(newLongestchain)){
        Blocks.chain = newLongestchain;
        Blocks.pendingTransactions = newPendingTransactions;

        res.json({
            message:'This chain has been replaced.',
            chain:Blocks.chain
        });
    };
    
    
    } catch (error) {
        res.json(error)
    }
});

/* Get block by hash */
app.get('/block/:hash', (req,res)=>{
    const {hash} = req.params;

    const block = Blocks.getBlockByHash(hash);
    
    res.json({
        message:block
    });
});


/* Get transaction by id */
app.get('/transaction/:transactionId', (req,res)=>{
    const {transactionId} = req.params;

    const transaction = Blocks.getTransaction(transactionId);

    res.json({message:transaction});
});

/* Get transactions by address */
app.get('/address/:address', (req,res)=>{
    const {address} = req.params;

    const info = Blocks.getAddressInformation(address);

    res.json(info);
})






app.listen(PORT, () => console.log(`server started on port ${PORT}`))