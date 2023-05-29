import blockFactory from "./utils/blockFactory"
//* yarn test:watch ./tests/block.spec.ts

describe('Block expectations', () => {
  it("should be able to create a block", () => {
    const block = blockFactory()

    expect(block).toBeTruthy()
  })

  it("should have consistent hash calculation", () => {
    const block = blockFactory()

    const originalHash = block.hash
    const regeneratedHash = block.calculateHash()

    expect(originalHash).toEqual(regeneratedHash)
  })

  describe("Mining expectations", () => {
    let consoleLogSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>

    beforeAll(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterAll(() => {
      consoleLogSpy.mockRestore()
    })

    /*
     * It only works if `target` constant inside the `calculateTarget` method
     * contains the number `100000` on its calculus.
     * 
     * Because if not this number, it should take much time to mine,
     * and for a test, I think it's not needed.
     */
    it("should be able to mine a block", () => {
      const difficulty: number = 1
      const block = blockFactory()
  
      const unminedBlockHash = block.hash
  
      block.mineBlock(difficulty)
  
      const minedBlockHash = block.hash
  
      expect(minedBlockHash.startsWith("0000")).toBe(true)
      expect(unminedBlockHash).not.toEqual(minedBlockHash)
  
    })
  
    it("should have a valid hash", () => {
      const difficulty: number = 6.09
      const block = blockFactory()
  
      block.mineBlock(difficulty)
  
      const minedBlockHash = block.hash
  
      expect(minedBlockHash).toMatch(/^[0-9a-fA-F]{64}$/)
      expect(minedBlockHash).toMatch(/^0{4,}[0-9a-fA-F]{60}$/)
    })

    it("should have consistent hash calculation", () => {
      const difficulty: number = 1
      const block = blockFactory()
  
      block.mineBlock(difficulty)

      const minedBlockHash = block.hash
      const regeneratedMinedBlockHash = block.calculateHash()
  
      expect(minedBlockHash).toEqual(regeneratedMinedBlockHash)
    })
  })
})


