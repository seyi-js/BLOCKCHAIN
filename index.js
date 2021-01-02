const Crypto = require('crypto')

class Blockchain{
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];


        //Genesis Block
        this.createNewBlock( 20000, '0', '0' );
    };


    //Method
    createNewBlock(nonce,previousBlockHash,hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            previousBlockHash,
            hash
        };
        this.pendingTransactions = [];
        this.chain.push( newBlock );
       
        return newBlock;
    }


    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }



    createNewTransaction( amount, sender, recipient ) {
        
        const newTransaction = {
            amount,
            sender,
            recipient
        };

        this.pendingTransactions.push( newTransaction );

        return this.getLastBlock()[ 'index' ] + 1;
        
    }

    hashBlock(previousBlockHash,currentBlockData,nonce) {
        const data = previousBlockHash + nonce.toString() + JSON.stringify( currentBlockData );
        let hash = Crypto.createHash( 'sha256' ).update( data ).digest( 'hex' ).toUpperCase();

        return hash;
       
    }

    proofOfWork( previousBlockHash, currentBlockData ) {
        let nonce = 0;
        let hash = this.hashBlock( previousBlockHash, currentBlockData, nonce );
        while (hash.substring(0,4) !== '0000') {
            nonce++;
            hash = this.hashBlock( previousBlockHash, currentBlockData, nonce );
            // console.log(hash)
        }
        
        return nonce;
    }
};


module.exports ={Blockchain}