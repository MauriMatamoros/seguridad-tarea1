var colors = require('colors/safe');
const words = require('an-array-of-english-words');
const _ = require('lodash/array');

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let string = 'phhw ph diwhu wkh wrjd sduwb'.toLowerCase();
let possibilities = [];

let stringToArray = (string) => {
    let array = [];
    for (i = 0; i < string.length; i++) { 
        array.push(string.charAt(i));
    }
    return array;
};

let array = stringToArray(string);

let shiftOne = (array) => {
    let string = '';
    array.forEach((letter) => {
        if (letter !== ' ') {
            if (alphabet.indexOf(letter) === 25) {
                string += 'a';
            } else {
                string += alphabet[alphabet.indexOf(letter) + 1];
            }
        } else {
            string += ' ';
        }
    });
    return string;
};

let decode = () => {
    for (let i = 0; i < alphabet.length; i++) {
        possibilities.push(shiftOne(array));
        array = stringToArray(shiftOne(array))
    }
};

decode();

class Phrase {
    constructor(possibilities) {
        this.possibilities = possibilities;
    }

    findWords(matchingWords) {
        let string = '';
        this.possibilities.forEach((possibility, index) => {
            matchingWords.forEach((matchingWord) => {
                if (matchingWord === possibility) {
                    possibility = colors.green(possibility);
                }
            });
            string += ` ${possibility}`;
        });
        return string;
    }

};

let matches = {
    index: 0,
    matches: 0
};

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
