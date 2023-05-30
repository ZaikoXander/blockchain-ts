import Blockchain from "@src/blockchain"
import Block from "@src/block"
import BlockData from "@src/blockData"
//* yarn test:watch ./tests/blockchain.spec.ts

describe("Blockchain expectations", () => {
  let consoleLogSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleLogSpy.mockRestore()
  })

  it("should be able to create a blockchain", () => {
    const blockchain = new Blockchain()

    expect(blockchain).toBeTruthy()
    
    const initialBlock = blockchain.getLatestBlock()

    expect(initialBlock.index).toEqual(0)
    expect(initialBlock.previousHash).toBe('')
    expect(initialBlock.data).toBe(undefined)
    expect(initialBlock.hash).toBe(initialBlock.calculateHash())
  })

  it("should be able to add new blocks", () => {
    const blockchain = new Blockchain()
    const blockData = new BlockData({ amount: 10 })

    blockchain.addBlock(blockData)
    blockchain.addBlock(blockData)
    blockchain.addBlock(blockData)

    const latestBlock = blockchain.getLatestBlock()

    expect(blockchain.getChain()).toHaveLength(4)
    expect(latestBlock).toBeTruthy()
    expect(latestBlock.index).toEqual(3)
    expect(latestBlock.data).toStrictEqual(new BlockData({ amount: 10 }))
  })

  it("should be able to get latest block mined", () => {
    const blockchain = new Blockchain()

    const latestBlock = blockchain.getLatestBlock()

    expect(latestBlock).toBeTruthy()
    expect(latestBlock).toBeInstanceOf(Block)
    expect(latestBlock).toBe(blockchain.getChain()[0])
  })

  it("should be able to get the chain", () => {
    const blockchain = new Blockchain()

    const blockData = new BlockData({ amount: 10 })

    blockchain.addBlock(blockData)

    const chain = blockchain.getChain()

    expect(chain).toBeTruthy()
    chain.forEach(block => {
      expect(block).toBeInstanceOf(Block)
    })
    expect(chain).toHaveLength(2)
  })

  it("should be able to check if chain is valid", () => {
    const blockchain = new Blockchain()
    const blockData = new BlockData({ amount: 10 })

    blockchain.addBlock(blockData)
    blockchain.addBlock(blockData)

    expect(blockchain.isChainValid()).toBe(true)
  })
})
