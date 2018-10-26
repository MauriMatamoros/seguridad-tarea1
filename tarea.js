var colors = require('colors/safe');
const words = require('an-array-of-english-words');
const _ = require('lodash/array');

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let string = 'phhw ph diwhu wkh wrjd sduwb'.toLowerCase();
let possibilities = [];
let twoLetterWords = words.filter((word) => word.length === 2);
let threeLetterWords = words.filter((word) => word.length === 3);

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

    findWords(twoLetterWords, threeLetterWords) {
        let string = '';
        this.possibilities.forEach((possibility) => {
            threeLetterWords.forEach((threeLetterWord) => {
                if (threeLetterWord === possibility) {
                    possibility = colors.green(possibility);
                }
            });
            twoLetterWords.forEach((twoLetterWord) => {
                if (twoLetterWord === possibility) {
                    possibility = colors.green(possibility);
                }
            });
            string += ` ${possibility}`;
        });
        return string;
    }

};

possibilities.forEach((possibility, index) => {
    let possibilityArray = possibility.split(' ');
    let phrase = new Phrase(possibilityArray);
    let matchingTwoLetterWords = _.intersection(possibilityArray, twoLetterWords);
    let matchingThreeLetterWords = _.intersection(possibilityArray, threeLetterWords);
    let string = phrase.findWords(matchingTwoLetterWords, matchingThreeLetterWords);
    if ((matchingTwoLetterWords.length > 0) || (matchingThreeLetterWords.length > 0)) {
        console.log(colors.red(`${index} Match Found: ${string}`));
    } else {
        console.log(`${index} ${string}`);
    }
});
