const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .postCss('resources/css/app.css', 'public/css')
   .options({
       poll: 1000 // Revisa cambios cada 1 segundo (ideal para Docker/WSL)
   });