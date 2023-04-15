import testData from './test.json'

export const getBlog = (id: string) => {
  return testData.find((data) => data.id == id)
}

export default testData
