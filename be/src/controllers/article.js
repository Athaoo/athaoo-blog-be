import Article from '../models/article.js'
import Joi from 'joi'

const articleSchema = Joi.object({
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  summary: Joi.string(),
  content: Joi.string().required(),
  author: Joi.string(),
})

export const createArticle = async (ctx) => {
  try {
    console.log(ctx.request.body)
    const { error, value } = articleSchema.validate(ctx.request.body)

    if (error) {
      ctx.status = 400
      ctx.body = {
        message: 'Invalid article data',
      }
    }

    const article = await Article.create(value)
    ctx.status = 201
    ctx.body = {
      message: 'Successfully created article'
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      message: 'Server error',
    }
  }
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
