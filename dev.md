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

##### 2023-05-28
上传封面，真坑啊，sequelize的局部update时要先用findOne拿到实例然后再调用实例的update，用Article.update限定fields不好使，比如不想更新tags时，仅更新title等时，也会走tags的校验之类的，导致报错，很恶心

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
