import Router from 'koa-router'

const router = new Router({ prefix: '/test' })

router.get('/get1', async (ctx) => {
  ctx.body = '惹啊,body是字符串!'
})

router.get('/getcors', async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.body = '惹啊,允许http://127.0.0.1:5173/跨域请求!'
})

router.post('/post1', async (ctx) => {
  ctx.body = {
    msg: '我测，什么情况',
    obj: {
      a: '这是啊',
      b: '这是b',
    },
  }
})

export default router
