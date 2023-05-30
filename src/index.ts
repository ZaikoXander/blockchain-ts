import Blockchain from "./blockchain"
import BlockData from "./blockData"

const blockchain = new Blockchain()

const blockData1 = new BlockData({
  amount: 10
})
blockchain.addBlock(blockData1)

const blockData2 = new BlockData({
  amount: 4
})
blockchain.addBlock(blockData2)

console.log(`Is chain valid? ${blockchain.isChainValid()}`)

console.log(JSON.stringify(blockchain, null, 2))
