# 开发日志



##### 2023-04-25

封装了axios，学了Omit、pick等泛型常用操作,这样就可以更精确地设置add和update的接口所需要的参数类型

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



封装了useRequest并正确往里面传递了参数

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

在admin-fe的编辑文章页面，在useEffect里面用useRequest的请求发送请求时，首次请求或刷新时拿到的结果为null，但是ui都正常，热更新后就打印了正确的article。

原因应该是setState并非立即更新的的，这里打印的时候拿到的是未更新的值

```tsx
//

const { id } = useParams()
  console.log(`🚀 -> file: EditArticle.tsx:10 -> App -> id:`, id)
  const [article, loading, reqOneArticle] = useRequest(getOneArticle)

  const formatArticleForm = (article: Article) => {
    return {
      ...article,
      tags: article.tags.reduce((res, tag) => (res == '' ? tag : `${res},${tag}`), ''),
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


