const mix = require('laravel-mix');
const fs = require('fs');

const customThemes = [
    'vscode_dark.css',
];

function getFiles(dir) {
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

getFiles('postcss/themes/theme/').forEach((filepath) => {
    mix.postCss('postcss/themes/theme/' + filepath, 'themes/');
});

getFiles('postcss/custom').forEach((filepath) => {
    mix.postCss('postcss/custom/' + filepath, 'themes/', [
        require('postcss-nesting'),
    ]);
});

mix
    .setPublicPath('dist')
    .disableNotifications();