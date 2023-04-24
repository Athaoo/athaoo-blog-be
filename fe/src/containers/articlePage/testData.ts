import { BlogPost } from '@src/types/articlePage'
import testData from './test.json'

export const getBlog = (id: string) => {
  const newData = {} as BlogPost
  const originData = testData.find((data) => data.id == id)
  Object.assign(newData, originData)
  newData.createdAt = new Date(originData.createdAt)
  return newData
}

export default testData
