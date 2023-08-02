const ip = '154.8.162.201'

// 线上和生产是两个库
const config = {
  development: {
    username: 'athaoo',
    password: 'athaooblog123',
    database: 'athaoo_blog',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: 'athaoo',
    password: 'athaooblog123',
    database: 'athaoo_blog',
    host: ip,
    port: 3306,
    dialect: 'mysql',
  },
}

export default config
