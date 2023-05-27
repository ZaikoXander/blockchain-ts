import Blockchain from "./blockchain";

const blockchain = new Blockchain()

interface BlockDataConstructorParams {
  amount: number
}

export class BlockData {
  public amount: number

  constructor({ amount }: BlockDataConstructorParams) {
    this.amount = amount
  }
}

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
