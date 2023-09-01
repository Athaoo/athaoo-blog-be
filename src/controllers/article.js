import Article from '../models/article.js'
import Joi from 'joi'
import { Op } from 'sequelize'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { renameSync, unlinkSync } from 'fs'
import { isNumber, isString } from 'lodash-es'
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

/**封面是file 单独摘出来 */
const prehandleData = (data) => {
  const _d = cloneDeep(data)
  _d.tags = JSON.parse(data.tags)
  delete _d.cover
  return _d
}

const handleImgFile = (ctx, img) => {
  if (!img || !img || !img.filepath || !img.newFilename) return ''

  const tempPath = img.filepath
  const filename = img.newFilename
  let targetPath
  if (process.env.NODE_ENV == 'test') {
    targetPath = join(__rootDirname, 'public', 'imgs', img.newFilename)
  } else {
    const staticPath = '/usr/local/mylib/static/files'
    targetPath = join(staticPath, img.newFilename)
  }

  // 删掉旧封面, 存放在静态资源目录
  renameSync(tempPath, targetPath)

  // koa-static库把静态资源指向了public, 后缀带上pathname即可访问
  let publicURL
  if (process.env.NODE_ENV == 'test') {
    const host = ctx.request.host
    publicURL = new URL(`http://${host}`)
    publicURL.pathname = `/imgs/${filename}`
  } else {
    publicURL = new URL(`http://154.8.162.201`)
    publicURL.pathname = `/static/files/${filename}`
  }


  const url = publicURL.href
  return url
}

export const createArticle = async (ctx) => {
  try {
    const { error, value } = articleCreateScheme.validate(prehandleData(ctx.request.body))

    if (error) {
      ctx.status = 400
      ctx.body = {
        message: `Invalid article data${error.message}`,
      }
    }

    const { id, title, tags, summary, content, author } = ctx.request.body

    let cover = ctx.request.files.cover ?? ''
    if (cover) {
      cover = handleImgFile(ctx, cover)
    }

    const article = await Article.create({
      id,
      title,
      tags: JSON.parse(tags),
      summary,
      content,
      cover,
      author,
    })
    ctx.status = 201
    ctx.body = {
      message: 'Successfully created article',
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      message: err.message,
    }
    console.log(err.stack)
  }
}

export const getArticles = async (ctx) => {
  try {
    let pageLimit = parseInt(ctx.query?.pageLimit ?? NaN)
    let pageNum = parseInt(ctx.query?.pageNum ?? NaN)
    let condition = JSON.parse(ctx.query?.condition ?? null)
    let orderBy = ctx.query?.orderBy ?? null
    let isDesc = JSON.parse(ctx.query?.isDesc ?? 'true') ?? true

    const param = {}
    if (!isNaN(pageLimit) && !isNaN(pageNum)) {
      param.limit = pageLimit
      param.offset = pageLimit * pageNum
    }

    if (isString(orderBy)) {
      const orderPiece = [orderBy]
      if (isDesc === true) {
        orderPiece.push('DESC')
      }
      param.order = [orderPiece]
    }
    console.log(`🚀 -> getArticles -> param:`, param)

    if (condition) {
      if (condition.tags && condition instanceof Array) {
        param.where.tags = {
          [Op.overlap]: condition.tags,
        }
      }
    }

    const articles = await Article.findAll(param)
    ctx.body = articles
  } catch (e) {
    ctx.body = { message: `Get article failed: ${e.message}` }
    ctx.status = 500
  }
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

    const record = await Article.findOne({ where: { id } })
    if (!record) {
      ctx.body = { message: 'Article not found' }
      ctx.status = 404
      return
    }

    let cover = ctx.request.files.cover ?? ''
    if (cover) {
      cover = handleImgFile(ctx, cover)
      await record.update({ cover })
    }

    await record.update({ title, tags: JSON.parse(tags), summary, content, author })
    ctx.body = { message: 'Article updated successfully' }
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
