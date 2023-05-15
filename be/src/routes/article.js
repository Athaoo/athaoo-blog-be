import Router from 'koa-router'
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/article.js'

const router = new Router({ prefix: '/api' })

router.get('/article/test', async (ctx) => {
  ctx.body = {
    title: '惹啊！！！ 文章测试',
  }
})
router.post('/article', createArticle)
router.get('/article', getArticles)
router.get('/article/:id', getArticleById)
router.put('/article/:id', updateArticle)
router.delete('/article/:id', deleteArticle)

export default router
