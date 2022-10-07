const mix = require('laravel-mix');
const fs = require('fs');

function getFiles(dir) {
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

getFiles('postcss/themes/theme/').forEach(function (filepath) {
    mix.postCss('postcss/themes/theme/' + filepath, 'themes/');
});

mix
    .postCss('postcss/editor.css', 'editor.css', [
        require('postcss-nesting'),
    ])
    .setPublicPath('dist')
    .disableNotifications()
    ;