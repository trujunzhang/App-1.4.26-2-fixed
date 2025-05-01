const fs = require('fs');

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}

const filePath = process.argv[2] || 'Default';
console.log('filePath: ', filePath);

const words = process.argv[3] || 'Default';
console.log('words: ', words);

var text = fs.readFileSync(filePath).toString('utf-8');

var textByLine = text.split('\n');
//console.log('textByLine: ', textByLine);

for (var i = 0; i < textByLine.length; i++) {
    const line = textByLine[i].toLowerCase();

    if (line.includes('//') == false) {
        if (line.includes(words.toLowerCase()) == true) {
            textByLine[i] = '// ' + textByLine[i].trim();
            if (line.includes('() =>') == false) {
                textByLine[i - 1] = '// ' + textByLine[i - 1].trim();
            }
            if (line.includes('return') == true) {
                textByLine[i + 1] = '// ' + textByLine[i - 1].trim();
            }
        }
    }
}

text = textByLine.join('\n');
fs.writeFileSync(filePath, text);
