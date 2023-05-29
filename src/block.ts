import crypto from "node:crypto"

import { BlockData } from "."

class Block {
  public index: number
  public timestamp: number
  public data?: BlockData
  public previousHash: string
  public hash: string
  public nonce: number

  constructor(
    index: number,
    data?: BlockData,
    previousHash = ''
  ) {
    this.index = index
    this.timestamp = Date.now()
    this.data = data
    this.previousHash = previousHash
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  public calculateHash(): string {
    return crypto
      .createHash('SHA256')
      .update(
        this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
      )
      .digest("hex")
  }

  private calculateTarget(difficulty: number): string {
    const maxTarget = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    const target = maxTarget / BigInt(difficulty * /* 10000000000 */100000)
    const targetHex = target.toString(16).padStart(64, '0')
    return targetHex
  }

  private validateHash(hash: string, difficulty: number): boolean {
    const target = this.calculateTarget(difficulty)
    const hashBigInt = BigInt(`0x${hash}`)
    const targetBigInt = BigInt(`0x${target}`)
    return hashBigInt <= targetBigInt
  }

  public mineBlock(difficulty: number): void {
    while (!this.validateHash(this.hash, difficulty)) {
      this.nonce++
      this.timestamp = Date.now()
      this.hash = this.calculateHash()
    }

    console.log(`Block mined: ${this.hash}`)
  }
}

export default Block
