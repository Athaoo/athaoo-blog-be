import Router from 'koa-router'
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/article.js'

const router = new Router()

const testData = {
  id: 1,
  title: 'React 18 发布了！',
  createdAt: '2023-04-17',
  tags: ['React', '前端开发'],
  summary: 'React 18 发布了！这个版本带来了很多新特性和改进，包括...',
  content:
    'React 18 是一个重大版本，其中包含了一些非常重要的特性和改进，包括 Suspense List、JSX 嵌套、新的 Context API 等等。这些特性和改进将进一步提高 React 应用的性能和可维护性。对于想要学习 React 的开发者来说，掌握 React 18 中的新特性和改进非常重要。\n    其中一个特性是 Suspense List，它可以让我们更好地控制数据的加载和展示。这个特性是在 Suspense 基础上发展而来的，它允许我们将多个 Suspense 组合在一起，以实现更复杂的场景，例如处理多个异步请求。JSX 嵌套也是一个非常重要的特性，它可以使我们在 JSX 中更好地组织代码，提高代码可读性。新的 Context API 则可以让我们更好地管理应用状态。\n    如果您想要了解 React 18 的更多内容，请查看官方文档，或者尝试使用 React 18 开发一个新的应用程序。',
  author: '张三',
}
router.get('/article/test', async (ctx) => {
  ctx.body = {
    title: '惹啊！！！ 文章测试',
  }
})
router.get('/article/1', async (ctx) => {
  ctx.status = 200
  ctx.body = testData
})
router.post('/article', createArticle)
router.get('/article', getArticles)
router.get('/article/:id', getArticleById)
router.put('/article/:id', updateArticle)
router.delete('/article/:id', deleteArticle)

export default router
