const fs = require('fs');

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}

const filePath = process.argv[2] || 'Default';
console.log('filePath: ', filePath);

//action:
// "withReturn|PlaidLink|singleLine"
const action = process.argv[3] || 'Default';
console.log('action: ', action);

const acts = action.split('|');
const actType = acts[0];

const matchStrings = acts[1].split('-');
const matchedFirst = matchStrings[0];
const startString = '<' + matchedFirst.toLowerCase();
const endString = ' </' + matchedFirst.toLowerCase() + '>';
//commentType: singleLine, multipleLineWithBraces,
const commentType = acts[2];

var text = fs.readFileSync(filePath).toString('utf-8');

var textByLine = text.split('\n');
//console.log('textByLine: ', textByLine);

var startIndex = -1;
var endIndex = -1;
var matchCount = 0;

function check_whether_match_line(p) {
    const line = textByLine[p].toLowerCase();
    var nextLine = '';
    if (p + 1 < textByLine.length) {
        nextLine = textByLine[p + 1];
    }
    //console.log('nextLine: ',nextLine)
    if (line.includes(startString)) {
        if (matchStrings.length === 1) {
            return true;
        }

        if (nextLine.includes(matchStrings[1])) {
            return true;
        }
    }

    return false;
}

for (var i = 0; i < textByLine.length; i++) {
    const line = textByLine[i].toLowerCase();

    if (startIndex == -1) {
        if (check_whether_match_line(i)) {
            console.log('matched line: ', line);
            if (line.includes('//') == false) {
                if (line.includes('{/*') == false) {
                    if (actType === 'withReturn' && textByLine[i - 1].includes('{/*') == false) {
                        startIndex = i;
                        if (actType === 'withReturn') {
                            startIndex = i - 1;
                        }
                    }
                }
            }
        }
    } else if (startIndex !== -1) {
        if (line.includes('<')) {
            matchCount = matchCount + 1;
        }
    }

    if (startIndex !== -1 && endIndex == -1) {
        //console.log(" matchCount:",matchCount)
        if (line.includes('/>')) {
            if (matchCount > 0) {
                matchCount = matchCount - 1;
            } else {
                endIndex = i;
                if (actType === 'withReturn') {
                    endIndex = i + 1;
                }
            }
        } else if (line.includes(endString)) {
            endIndex = i;
            if (actType === 'withReturn') {
                endIndex = i + 1;
            }
        }
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    console.log('=================================');
    console.log(' startString :', startString);
    console.log(' startIndex :', startIndex);
    console.log(' endIndex:', endIndex);
    console.log('=================================');
    if (commentType === 'singleLine') {
        for (var i = startIndex; i <= endIndex; i++) {
            const line = textByLine[i];
            textByLine[i] = '// ' + line;
        }
    } else if (commentType === 'multipleLineWithBraces') {
        textByLine[startIndex] = '{/* ' + textByLine[startIndex];
        textByLine[endIndex] = textByLine[endIndex] + ' */}';
    }

    text = textByLine.join('\n');
    fs.writeFileSync(filePath, text);
}
