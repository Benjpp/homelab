const mix = require('laravel-mix');

mix.options({
    poll: 1000,
})

// mix.webpackConfig({
//     resolve: {
//         fallback: {
//             "fs": false,
//             "path": false,
//             "stream": false,
//             "os": false,
//             "crypto": false,
//             "http": false,
//             "https": false,
//             "constants": false
//         }
//     }
// })

mix.postCss('resources/css/app.css', 'public/css')
mix.postCss('resources/css/colors/components.css', 'public/css/colors/components')

mix.js('resources/js/app.js', 'public/js/app.min.js')
mix.js('resources/js/config/users.js', 'public/js/users.min.js')
mix.js('resources/js/config/permissions.js', 'public/js/permissions.min.js')
mix.js('resources/js/config/roles.js', 'public/js/roles.min.js')
mix.js('resources/js/config/modals/modal-permissions.js', 'public/js/modal-permissions.min.js')
mix.js('resources/js/config/modals/modal-users.js', 'public/js/modal-users.min.js')
mix.js('resources/js/cloud-storage/index.js', 'public/js/cloud-storage/index.min.js')
mix.js('resources/js/cloud-storage/modals/modal-directory.js', 'public/js/cloud-storage/modal-directory.min.js')

mix.version()