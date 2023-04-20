import Article from '../models/article.js'

export const createArticle = async (ctx) => {
  const { title, time, tags, summary, content, author } = ctx.request.body
  const article = await Article.create({ title, time, tags, summary, content, author })
  ctx.body = article
}

export const getArticles = async (ctx) => {
  const articles = await Article.findAll()
  ctx.body = articles
}

export const getArticleById = async (ctx) => {
  const { id } = ctx.params
  const article = await Article.findByPk(id)
  ctx.body = article
}

export const updateArticle = async (ctx) => {
  const { id } = ctx.params
  const { title, time, tags, summary, content, author } = ctx.request.body
  await Article.update({ title, time, tags, summary, content, author }, { where: { id } })
  ctx.body = { message: 'Article updated successfully' }
}

export const deleteArticle = async (ctx) => {
  const { id } = ctx.params
  await Article.destroy({ where: { id } })
  ctx.body = { message: 'Article deleted successfully' }
}
