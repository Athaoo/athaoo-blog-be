import Article from '../models/article.js'
import Joi from 'joi'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { renameSync, unlinkSync } from 'fs'
import { castArray, cloneDeep } from 'lodash-es'

const __filename = fileURLToPath(import.meta.url)
const __rootDirname = dirname(dirname(dirname(__filename)))


const articleCreateScheme = Joi.object({
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  summary: Joi.string(),
  content: Joi.string().required(),
  author: Joi.string(),
})

const articleUpdateScheme = Joi.object({
  title: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  summary: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
})

const prehandleData = (data) => {
  const _d = cloneDeep(data)
  _d.tags = castArray(data.tags)
  console.log(`🚀 -> prehandleData -> _d.tags:`, _d.tags)
  return _d
}

export const createArticle = async (ctx) => {
  try {
    const { error, value } = articleCreateScheme.validate(prehandleData(ctx.request.body))

    if (error) {
      ctx.status = 400
      ctx.body = {
        message: 'Invalid article data',
      }
      return
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

  try {
    const { error, value } = articleUpdateScheme.validate(prehandleData(ctx.request.body))
    if (error) {
      console.log(`updateArticle -> error:`, error)
      ctx.status = 400
      ctx.body = {
        message: 'Invalid article data',
      }
      return
    }

    const { title, tags, summary, content, author } = ctx.request.body

    let cover = ctx.request.files.cover ?? ''
    if (cover) {
      const tempPath = cover.filepath
      const targetPath = join(__rootDirname, 'public', 'imgs', cover.newFilename)
      console.log(`🚀 -> updateArticle -> targetPath:`, targetPath)

      // 删掉旧封面
      renameSync(tempPath, targetPath)
      await Article.update({ cover: targetPath }, { where: { id } })
      unlinkSync(tempPath)
    }

    // await Article.update({ title }, { where: { id } })
    // await Article.update({ title, tags, summary, content, author }, { where: { id } })
    ctx.body = { message: 'Article updated successfully', cover: targetPath }
  } catch (e) {
    console.log(`updateArticle -> e:`, e)
    ctx.body = { message: 'Article update failed' }
    ctx.status = 500
  }
}

export const deleteArticle = async (ctx) => {
  const { id } = ctx.params
  await Article.destroy({ where: { id } })
  ctx.body = { message: 'Article deleted successfully' }
}
