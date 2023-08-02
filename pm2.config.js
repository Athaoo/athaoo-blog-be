module.exports = {
  apps: [
    {
      name: 'blog',
      script: 'app.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'], // 可选：指定忽略监视的目录
    },
  ],
}
