const { Blockchain } = require('./blockchain');

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



const chain = [
    {
        "index": 1,
        "timestamp": 1625391182798,
        "transactions": [],
        "nonce": 20000,
        "previousBlockHash": "0",
        "hash": "0"
    },
    {
        "index": 2,
        "timestamp": 1625391343591,
        "transactions": [
            {
                "transaction_id": "a98590f176627d8f38ea",
                "timestamp": 1625391328680,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "a20f184c08b11fa94e6c",
                "timestamp": 1625391329627,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "052e95d22f6f8bfd45ad",
                "timestamp": 1625391330640,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            }
        ],
        "nonce": 35952,
        "previousBlockHash": "0",
        "hash": "00003DD163D5DAEAB65E7F935B23EB7E362AB9ABA68D7CE807674C36FBF13961"
    },
    {
        "index": 3,
        "timestamp": 1625391355282,
        "transactions": [
            {
                "transaction_id": "25beb6f6426bc07cae89",
                "timestamp": 1625391343667,
                "amount": 12.5,
                "sender": "00",
                "recipient": "9DDCDEDC17840160C30C78F308590659EAD2EA86FEFA20703B3C428ADDD15E169B5D7D5FC4CF8C7E06A7DC1355DD6475A55C4448882DB3A5529D9755B226C82DC7A8632877B397394A43C5E6FA706A8007D27A5D0F20BD6C018D2FE1C2B3B64D6EAB6B96C100A537C0451ECEA2BA249DEEAEEB40F22321D7"
            },
            {
                "transaction_id": "113458ed571221528957",
                "timestamp": 1625391347814,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "cef3f1c90e8a759ff683",
                "timestamp": 1625391348748,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "b20c3be5a5b5f43d3c4b",
                "timestamp": 1625391349803,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "72bed0dc6bff02c0a129",
                "timestamp": 1625391350536,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            }
        ],
        "nonce": 23077,
        "previousBlockHash": "00003DD163D5DAEAB65E7F935B23EB7E362AB9ABA68D7CE807674C36FBF13961",
        "hash": "0000FAEEAC05BC13AA11F9517A7DC90F2CCBCB89F0515747082CCF6EB840D292"
    },
    {
        "index": 4,
        "timestamp": 1625391369550,
        "transactions": [
            {
                "transaction_id": "0f8da066541d6b09a6be",
                "timestamp": 1625391355289,
                "amount": 12.5,
                "sender": "00",
                "recipient": "9DDCDEDC17840160C30C78F308590659EAD2EA86FEFA20703B3C428ADDD15E169B5D7D5FC4CF8C7E06A7DC1355DD6475A55C4448882DB3A5529D9755B226C82DC7A8632877B397394A43C5E6FA706A8007D27A5D0F20BD6C018D2FE1C2B3B64D6EAB6B96C100A537C0451ECEA2BA249DEEAEEB40F22321D7"
            },
            {
                "transaction_id": "0600d102ba76519d9477",
                "timestamp": 1625391358490,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "b6a2f578f8aaea86230a",
                "timestamp": 1625391359308,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "5a289d6b6e9801397dbb",
                "timestamp": 1625391360162,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            },
            {
                "transaction_id": "bd60fd82459430a20ca4",
                "timestamp": 1625391360996,
                "amount": "50000",
                "sender": "43434fdfdfdfd",
                "recipient": "43434fdfdfdfd"
            }
        ],
        "nonce": 165981,
        "previousBlockHash": "0000FAEEAC05BC13AA11F9517A7DC90F2CCBCB89F0515747082CCF6EB840D292",
        "hash": "000087F638D5E15904B37BEF3C1D0EAD9FA596E0C4DF9460968B19060CE169B9"
    }
]


// console.log('jjj');

// console.log('VALID:', Block.chainIsValid(chain));
