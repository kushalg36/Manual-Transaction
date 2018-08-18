var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/bd57f96bc63748f8b65a36516cf38e00')

const account1 = '0x612182b2fa6b102d7fc8b4daaa30e679d2d4d446'
const account2 = '0xeB9F2C86b506E6B1E9b5A5Dd301595c2655095a4'

const privateKey1 = Buffer.from('*private key 1*','hex');
const privateKey2 = Buffer.from('*private key 2*','hex');

// web3.eth.getBalance(account1,(err,bal) => {
//   console.log('account1: ',bal);
// })
//
// web3.eth.getBalance(account2,(err,bal) => {
//   console.log('account2: ',bal);
// })
web3.eth.getTransactionCount(account1, (err,txtCount) =>{

  //Build the transaction
  const txObject= {
    nonce: web3.utils.toHex(txtCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei('1','ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
  }

  //sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTransaction = tx.serialize();
  const raw = '0x' + serializedTransaction.toString('hex');
  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw,(err,txHash) => {
    console.log('txHash: ',txHash)
  })
})
