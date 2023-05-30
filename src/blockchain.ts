import Block from "./block"
import BlockData from "./blockData"

class Blockchain {
  private difficulty: number
  private chain: Block[]

  constructor() {
    this.difficulty = 1
    this.chain = [this.createInitialBlock()]
  }

  private createInitialBlock(): Block {
    const initialBlock = new Block(0)
    initialBlock.mineBlock(this.difficulty)
    return initialBlock
  }

  public getChain(): Block[] {
    return this.chain
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1]
  }

  public addBlock(blockData: BlockData): void {
    const newBlockIndex = this.getLatestBlock().index + 1
    const newBlock = new Block(newBlockIndex, blockData, this.getLatestBlock().hash)
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]  
      const previousBlock = this.chain[i - 1]    

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }

    return true
  }
}

export default Blockchain
