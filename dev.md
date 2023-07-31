# **todo**

- [ ] admin-fe

  - [ ] 管理员登陆注册

  - [ ] 后端日志

  - [ ] 添加文章

    - [ ] 复制图片

      - [ ] 添加文章复制图片时自动生成静态资源链接

      - [ ] base64

  - [ ] 文章列表

    - [ ] 筛选

    - [ ] 分页/条件查询文章

    - [ ] 文章懒加载

    - [ ] 排序

  - [ ] 文章管理图表统计

    - [ ] 分布最多的文章 tag

    - [ ] 写文章热点图

    - [ ] 访问次数

    - [ ] 每个文章的数据：访问量

- [ ] be

  - [ ] token

    - [x] token 如何生成，如何生成 jwt

    - [ ] 如何设置有效期

  - [ ] 文章

    - [ ] 添加封面图片

  - [ ] 静态资源

- [ ] fe

  - [ ] bvh 树

  - [ ] 列表

  - [ ] 卡片展示最新文章

    - [ ]

- [ ] nginx

  - [ ] 请求转发，或者 node？

  - [ ] 大文件上传下载

    - [ ] 分片下载

    - [ ] spark-md5 给服务器唯一标识

  - [ ] 缓存？

# 开发日志


##### 2023-07-31

添加了vite下env的配置。不知道为什么，在vite.config.js下如果不手动dotenv.config()就没处理.env环境。
admin和blog现在用两个config，分开dev和打包

##### 2023-07-27

1. 由于依赖以及通用的 api、types、组件比较多，将 admin-fe 移植到了 fe 中
2. 移植后变成了 2 入口的多页面应用，并将 fe 的开发环境替换成 vite，解决了多页面应用的入口问题，配置了 vite.config.ts 和 package.json 的 vite serve 指令，dev 速度提升显著。
3. 把所有的 md 换成了 bytemd，用 hightlight.js 换了主题

##### 2023-07-26

完成了 article 列表的下拉懒加载

##### 2023-07-23

package.json 让 css 为 sideEffect 为 false，会导致 tailwind 失效，需要把 css 置为 sideeffect 项

##### 2023-07-23

webpack 优化

生产环境， 优化前带 source-map 24mb 开发环境 dev 要 20s

用 eval-source-map 7mb

关闭 source-map js 剩下 3.4mb 还有 4.4mb 是一个点云+图片静态资源

1. prod 环境设置别名，精准命中库 react，变成了 3.3mb，减小了一点点

2. rules 添加 oneOf 字段，避免重复校验后缀，现在打包变成 16s

3. thread-loader 多进程，负优化，变成 17s，可能是因为本身打包时间没那么长

##### 2023-07-20

hover 显示卡片彩色渐变边框 get,条件排序筛选查询接口 get

##### 2023-07-19

tailwind 会导致 antd button 图标不居中,学了下 useMemo/memo 用在了 blogList,把卡片组件封装了一下

##### 2023-05-28

上传封面，真坑啊，sequelize 的局部 update 时要先用 findOne 拿到实例然后再调用实例的 update，用 Article.update 限定 fields 不好使，比如不想更新 tags 时，仅更新 title 等时，也会走 tags 的校验之类的，导致报错，很恶心。
总之搞定了，要用 koa-static 设置静态资源目录，后端拿到请求后，用 koa-body 解析请求体拿到 file 实例，然后转移文件路径到静态资源目录下，向数据库存储 host+文件资源路径,这样前端拿到数据后就能直接请求到图片封面了

##### 2023-05-28

详细的 react+webpack+postcss+tailwind 配置，官方并没有 create-react-app 和 webapck 关于 tailwind 的详细配置，踩了些坑配好了。文章关于 webpack 的 css 相关 loader 和 plugin 的作用写的很详细
https://www.iwenson.com/articles/react-with-tailwindcss-from-scratch

##### 2023-05-16

完成了简易版的路由跳转守卫，react 并没有 beforeEach 守卫，需要自己实现 HOC 包裹手动跳转。
发现 jwt-koa 鉴权错误是因为 cors 放在了 jwtKoa 鉴权的后面，放到前面就好了

##### 2023-04-26

发现 editArticle 里面并没有出现多余的渲染，想多了

antd 的 message 组件要用 useMessage 的 hook 调用，直接 message.info 会爆警告

##### 2023-04-25

封装了 axios，学了 Omit、pick 等泛型常用操作,这样就可以更精确地设置 add 和 update 的接口所需要的参数类型

```ts
export type AddArticleType = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateArticleType = AddArticleType
export interface Article {
	id?: string
	title: string
	tags: string[]
	summary?: string
	content: string
	author?: string
	createdAt?: Date
	updatedAt?: Date
}
```

封装了 useRequest 并正确往里面传递了参数

```tsx
// useRequest Hook
export const useRequest = <T, P>(requestFunction: RequestFunction<T, P>) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)

	const fetchData = async (params: P) => {
		try {
			setData(null)
			setLoading(true)
			const response = await requestFunction(params)
			console.log(`🚀 -> file: index.ts:53 -> fetchData -> response:`, response)
			setData(response.data)
		} catch (err) {
			console.error(`Error fetching data`, err)
		} finally {
			setLoading(false)
		}
	}

	return [data, loading, fetchData] as const
}
```

遇到的问题：

在 admin-fe 的编辑文章页面，在 useEffect 里面用 useRequest 的请求发送请求时，首次请求或刷新时拿到的结果为 null，但是 ui 都正常，热更新后就打印了正确的 article。

原因应该是 setState 并非立即更新的的，这里打印的时候拿到的是未更新的值

```tsx
//

const { id } = useParams()
console.log(`🚀 -> file: EditArticle.tsx:10 -> App -> id:`, id)
const [article, loading, reqOneArticle] = useRequest(getOneArticle)

const formatArticleForm = (article: Article) => {
	return {
		...article,
		tags: article.tags.reduce(
			(res, tag) => (res == '' ? tag : `${res},${tag}`),
			'',
		),
		content: JSON.parse(article.content),
	}
}
useEffect(() => {
	const cb = async () => {
		await reqOneArticle(Number(id))
		console.log(`🚀 -> file: EditArticle.tsx:17 -> .then -> article:`, article)
	}

	cb()
}, [])
```
