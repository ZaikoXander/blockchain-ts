import Block from "@src/block"

interface IData {
  amount: number
}

function blockFactory(index: number = 0, { amount }: IData = { amount: 10 }) {
  return new Block(index, { amount })
}

export default blockFactory
