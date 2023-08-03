const { config } = require('dotenv-flow')

// 读取环境变量
config({ debug: true })

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME ?? 'blog',
      script: './app.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
    },
  ],
}
