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

var startIndex = -1;
var endIndex = -1;
var matchCount = 0;

function check_whether_match_line(p) {
    const line = textByLine[p].toLowerCase();
    if (line.includes(words.toLowerCase())) {
        return true;
    }

    return false;
}

for (var i = 0; i < textByLine.length; i++) {
    const line = textByLine[i].toLowerCase();

    if (startIndex == -1) {
        if (line.includes('#') == false) {
            if (check_whether_match_line(i)) {
                console.log('matched line: ', line);
                startIndex = i;
            }
        }
    }

    if (startIndex !== -1 && endIndex == -1) {
        //console.log(" matchCount:",matchCount)
        if (line.includes('fi')) {
            endIndex = i;
        }
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    console.log('=================================');
    console.log(' words:', words);
    console.log(' startIndex :', startIndex);
    console.log(' endIndex:', endIndex);
    console.log('=================================');
    for (var i = startIndex; i <= endIndex; i++) {
        const line = textByLine[i];
        textByLine[i] = '# ' + line;
    }

    text = textByLine.join('\n');
    fs.writeFileSync(filePath, text);
}
