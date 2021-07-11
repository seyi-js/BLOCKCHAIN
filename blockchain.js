const Crypto = require('crypto')
const NodeURL = `http://localhost:${process.env.PORT}`;
const NodeAddress = Crypto.randomBytes(120).toString('hex').toUpperCase()
const EC = require('elliptic').ec
const ec = new EC('secp256k1')



class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.NodeAddress = NodeAddress;
        this.NodeURL = NodeURL;
        this.NetworkNodes = []

        //Genesis Block
        this.createNewBlock(20000, '0', '0');
    };


    //Method
    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            previousBlockHash,
            hash
        };
        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }


    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }




    /* This block Should be handled by the wallet or exhange company */
    createNewTransaction(amount, sender, recipient,key) {

        if(!amount || !sender || !recipient){
            throw new Error('Amount, sender, recipient reqquried.')
        }

        //TODO
        const newTransaction = {
            transaction_id: Crypto.randomBytes(10).toString('hex'),
            timestamp: Date.now(),
            amount,
            sender,
            recipient
        };

        let transaction = this.signTransaction(key,newTransaction)

        return transaction;

    };


    /* This block Should be handled by the wallet or exhange company */
    signTransaction(key, transaction) {

        if (key.getPublic('hex') !== transaction.sender) {
            throw new Error('You cannot sign transaction for a different wallet.')
        }
        const hash = this.hashTransaction(transaction);
        const sig = key.sign(hash, 'base64');
        transaction.signature = sig.toDER('hex');

        return transaction;

    };

    /* This block Should be handled by the wallet or exhange company */
    hashTransaction(transaction) {
        const data = JSON.stringify(transaction);
        let hash = Crypto.createHash('sha256').update(data).digest('hex').toUpperCase();

        return hash;

    };


    

    


    isTransactionValid(transaction){

        if(transaction.sender == '00') return true; // It's a mining reward.
        if(!transaction.signature || !transaction.sender || !transaction.amount || !transaction.recipient) return false;

        
        

        const publicKey = ec.keyFromPublic(transaction.sender, 'hex');//Generate key from public key
        let signature = transaction.signature
        transaction.signature = undefined;//Since it wasn't part of the hashed item, it needs to be removed.
        return publicKey.verify(this.hashTransaction(transaction),signature);//Verify Key

    };


    //VERIFY THAT THE SENDER HAS ENOUGH OF THIS MONEY BEFORE ACCEPTING, BY CALCULATING ALL TRANSACTIONS ASSOCIATED WITH THE ADDRESS.

    addTransactionToPendingTransactions(transaction) {

        if(!this.isTransactionValid(transaction)) throw new Error('Cannot add an invalid transaction.')
        this.pendingTransactions.push(transaction);

        return this.getLastBlock()['index'] + 1;
    }

    hashBlock(previousBlockHash, currentBlockData, nonce) {
        const data = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        let hash = Crypto.createHash('sha256').update(data).digest('hex').toUpperCase();

        return hash;

    };

    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        while (hash.substring(0, 4) !== '0000') {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
            // console.log(hash)
        }

        return nonce;
    };


    blockTransactionsAreValid(transactions){
        for(var i = 0; i < transactions.length; i++){
            if(!this.isTransactionValid(transactions[i])){
                return false
            };

            
        };

        return true;

    };

    chainIsValid(blockchain) {

        let validChain = true;

        for (var i = 1; i < blockchain.length; i++) {
            const currentBlock = blockchain[i];
            const previousBlock = blockchain[i - 1];

            const blockHash = this.hashBlock(previousBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);

            if (blockHash.substring(0, 4) !== '0000') {
                /* Invalid chain */
                validChain = false;
                break;

            };

            if (currentBlock['previousBlockHash'] !== previousBlock['hash']) {


                /* Invalid chain */
                validChain = false;
                break;

            };

            /*Validate the transactions in the block */
            if(!this.blockTransactionsAreValid(currentBlock['transactions'])){
                validChain = false;
                break;
            }


        };

        const genesisBlock = blockchain[0];
        const correctNonce = genesisBlock['nonce'] === 20000;
        const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === "0";
        const correctHash = genesisBlock['hash'] === '0';
        const correctTransactions = genesisBlock['transactions'].length === 0;



        if (!correctHash || !correctNonce || !correctPreviousBlockHash || !correctTransactions) {
            /* Invalid chain */
            validChain = false;
        };



        return validChain;

    };



    getBlockByHash(hash) {

        var correctBlock = null;
        this.chain.map(block => {
            if (block.hash === hash) {
                correctBlock = block;
            }
        });

        return correctBlock;
    };


    getTransaction(transactionId) {
        var correctTransaction = null;
        var correctBlock = null

        for (var i = 0; i < this.chain.length; i++) {
            this.chain[i].transactions.map(transaction => {
                if (transaction.transaction_id === transactionId) {
                    correctTransaction = transaction;
                    correctBlock = this.chain[i];
                }
            })
        };


        return {
            transaction: correctTransaction,
            block: correctBlock
        }

    };


    getAddressInformation(address) {
        var addressTransactions = [];
        for (var i = 0; i < this.chain.length; i++) {
            this.chain[i].transactions.map(transaction => {
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction);
                }
            })
        };

        let balance = 0;

        addressTransactions.map(transaction => {
            if (transaction.recipient === address) {
                balance += transaction.amount
            } else if (transaction.sender === address) {
                balance -= transaction.amount
            }
        })

        return {
            addressTransactions,
            balance
        };

    }


};
//45348

module.exports = { Blockchain }