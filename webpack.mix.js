const mix = require('laravel-mix');

mix.options({
    poll: 1000,

})

mix.js('resources/js/app.js', 'public/js')