## 2023-04-11

1. 重审 rotateBoxScene，用自定义 hook、普通 redux 的不同写法重构出两个 rotateBoxScene 来

2. 自定义 hook：

   1. data

      1. main camera 的数据是 main cam props 的依赖，main cam 的 props 是面板 info 的部分依赖，同时菜单会触发更新数据；

         单向数据流来讲，表单的 btn->data 是 view->data，而更新视图算是副作用。

## 需求

- [ ] 奥利安费

  - [ ] 类别查找，左侧列表展示 tag

  - [x] markdown 阅读

  - [ ] 锚点，右侧悬浮跳转段落

- [x] 阿米诺手

  - [x] 左侧列表 tag
  - [x] 跳转到的页面是实现的具体效果

- [ ] 展望

  - [ ] 做点游戏相关的东西

- [ ] 后台

  - [ ] 可视化访问数据等

  - [ ] 文章增删改查

  - [ ] markdown，富文本编辑

##

## 路由设计

- [x] 首页     /     默认 articles

  - [x] articles

    - [x] :articleId

  - [x] art

    - [ ] 每个页面独立路由

## 组件设计

偷学掘金设计 top，左侧悬浮栏，右侧悬浮栏

### Commit 信息

- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- style: 代码样式变更（不影响功能，比如空格、缩进等）
- refactor: 重构代码（不是新增功能或修复 bug）
- test: 增加或修改测试代码
- chore: 对构建或辅助工具的更改

此外，还有一些常用的前缀，例如：

- build: 构建相关的改动，例如发布版本、修改构建流程等。
- ci: 修改 CI 相关的配置或脚本。
- perf: 优化性能的代码更改。
- revert: 撤销之前的提交。
