interface BlockDataConstructorParams {
  amount: number
}

class BlockData {
  public amount: number

  constructor({ amount }: BlockDataConstructorParams) {
    this.amount = amount
  }
}

export default BlockData
