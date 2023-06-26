type Person = {
  name: string
  age: number
  address: string
  f: TF
}

type Person2 = {
  name: string
  age: number
}

type TF = (a: string) => boolean

type PKeys = keyof Person

type ExcludeString<T extends object> = {
  [K in keyof T]: T[K] extends string ? never : T[K]
}

type PickStringAttr<T extends object> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

type TP3 = PickStringAttr<Person>

type TP2 = ExcludeString<Person>

type MyPick<T, K extends keyof T> = {
  [key in K]: T[K]
}

type P1 = MyPick<Person, 'age' | 'address'>

// 使用 Omit 排除指定属性
type PersonWithoutAge = Omit<Person, 'age'>
// PersonWithoutAge 的类型为 { name: string; address: string; }

// 使用 Partial 将属性转为可选
type PartialPerson = Partial<Person>
// PartialPerson 的类型为 { name?: string; age?: number; address?: string; }

// 使用 Readonly 将属性转为只读
type ReadonlyPerson = Readonly<Person>
// ReadonlyPerson 的类型为 { readonly name: string; readonly age: number; readonly address: string; }

type AB = Exclude<'x' | 'a', 'x' | 'y' | 'z'>

// 使用 Record 创建映射类型
type PersonMap = Record<'person1' | 'person2', Person>
// PersonMap 的类型为 { person1: Person; person2: Person; }

// 使用 Exclude 排除可赋值给指定类型的属性
type NonNameKeys = Exclude<keyof Person, 'name'>
// NonNameKeys 的类型为 'age'

// 使用 Extract 提取可赋值给指定类型的属性
type StringKeys = Extract<keyof Person, 'name' | 'address'>
// StringKeys 的类型为 'name' | 'address'

// 使用 NonNullable 排除 null 和 undefined
type NonNullableName = NonNullable<Person['name']>
// NonNullableName 的类型为 string

type GetNameType = (name: string, age: number) => string
type Test = {
  name: string
  getName: GetNameType
}

type Sub = {
  name: string
  getName: GetNameType
  c: string
}

type GetFunctionParamAndReturnType<T> = T extends (...args: infer P) => infer R ? [P, R] : never

type T1 = GetFunctionParamAndReturnType<Test['getName']>

type A = Sub extends Test ? string : number
