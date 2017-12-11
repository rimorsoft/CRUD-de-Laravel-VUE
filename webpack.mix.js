const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
        'resources/assets/assets/jquery.js',
        'resources/assets/assets/bootstrap.js',
        'resources/assets/assets/toastr.js',
        'resources/assets/assets/vue.js',
        'resources/assets/assets/axios.js',
    ], 'public/js/assets.js')

    .js('resources/assets/js/app.js', 'public/js/app.js')

    .styles([
        'resources/assets/css/bootstrap.css',
        'resources/assets/css/toastr.css',
    ], 'public/css/app.css');
