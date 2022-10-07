import fs from 'fs';
import path from 'path';

const dir = 'postcss/themes/theme/';
const files = fs.readdirSync(dir).filter(file => {
    return fs.statSync(`${dir}/${file}`).isFile();
});

files.forEach(file => {
    let name = path.parse(file).name.replaceAll('_', '-');
    const filePath = dir + file;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;

        if (name === 'textmate') name = 'tm';

        if (!data.includes(`.ace-${name}`)) {
            console.error(`${file} does not contain class .ace-${name}`);
            return;
        }

        const newValue = data.replaceAll(`.ace-${name}`, '#ace-editor');

        fs.writeFile(filePath, newValue, 'utf-8', (err) => {
            if (err) throw err;
            console.log(`Write content to file ${name}`);
        });
    });
});
