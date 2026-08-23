const mix = require('laravel-mix');

mix.options({
    poll: 1000,
})

mix.postCss('resources/css/app.css', 'public/css')
mix.postCss('resources/css/colors/components.css', 'public/css/colors/components')

mix.js('resources/js/app.js', 'public/js/app.min.js')