/**postcss 用来处理生成的css*/
const tailwindcss = require('tailwindcss')
module.exports = {
  plugins: [require('autoprefixer'), tailwindcss('./tailwind.config.cjs')],
}
