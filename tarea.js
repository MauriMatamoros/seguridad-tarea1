var colors = require('colors/safe');
const words = require('an-array-of-english-words');
const _ = require('lodash/array');
const methods = require('./Methods');
const Phrase = require('./Phrase');

for (let i = 0; i < 2; i++) {
    let string = i === 0 ? 'PHHW PH DIWHU WKH WRJD SDUWB'.toLowerCase() : 'GCUA VQ DTGCM'.toLowerCase();
    let possibilities = [];
    let matches = {
        index: 0,
        matches: 0
    };
    let array = methods.stringToArray(string);
    methods.decode(array, possibilities);
    possibilities.forEach((possibility, index) => {
        let possibilityArray = possibility.split(' ');
        let phrase = new Phrase(possibilityArray);
        let matchingWords = _.intersection(possibilityArray, words);
        if (matches.matches < matchingWords.length) {
            matches.index = index;
            matches.matches = matchingWords.length;
        }
        let string = phrase.findWords(matchingWords);
        console.log(`${index} ${string}`);
    });
    console.log(colors.red(`Match found: ${possibilities[matches.index]}`));
}