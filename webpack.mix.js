const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix.setPublicPath('public')

mix
  .sass('assets/scss/main.scss', 'css/main.css')
  .options({
    postCss: [tailwindcss('./tailwind.config.js')]
  })
  .version()
