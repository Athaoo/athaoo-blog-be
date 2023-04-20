export interface BlogPost {
  id: string
  title: string
  tags: string[]
  content: string
  author: string
  summary: string
  createdAt: Date
  updatedAt?: Date
}
