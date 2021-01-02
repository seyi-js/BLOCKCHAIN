const { Blockchain } = require( './index' );

const Block = new Blockchain();

let previousBlockHash = '90CC33A41B541AF2C1964E3E10A46088CBDEDF63031EFAA35D588A698C91193F';
let currentBlockData = [
    {
        amount: 3000,
        sender: 'samuelsadasfsdafsdf35325324',
        recipient: 'topewesdvdsvvdsvd'
    },
    {
        amount: 3000,
        sender: 'samuelsadasfsdafsdf35325324',
        recipient: 'topewesdvdsvvdsvd'
    },
    {
        amount: 3000,
        sender: 'samuelsadasfsdafsdf35325324',
        recipient: 'topewesdvdsvvdsvd'
    }
];

let nonce = 12423432580787;

console.log(Block)