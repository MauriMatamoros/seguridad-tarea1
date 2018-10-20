var colors = require('colors/safe');
const words = require('an-array-of-english-words');
const _ = require('lodash/array');

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let string = 'phhw ph diwhu wkh wrjd sduwb';
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

possibilities.forEach((possibility) => {
    let possibilityArray = possibility.split(' ');
    let foundTwoLetterWord = _.intersection(possibilityArray, twoLetterWords);
    let foundThreeLetterWord = _.intersection(possibilityArray, threeLetterWords);
    if (foundTwoLetterWord.length > 0 && foundThreeLetterWord.length > 0) {
        console.log(possibilityArray[0], colors.green(possibilityArray[1]), possibilityArray[2], colors.green(possibilityArray[3]), possibilityArray[4], possibilityArray[5]);
    } else if (foundTwoLetterWord.length > 0) {
        console.log(possibilityArray[0], colors.green(possibilityArray[1]), possibilityArray[2], possibilityArray[3], possibilityArray[4], possibilityArray[5]);
    } else if (foundThreeLetterWord.length > 0) {
        console.log(possibilityArray[0], possibilityArray[1], possibilityArray[2], colors.green(possibilityArray[3]), possibilityArray[4], possibilityArray[5]);
    } else {
        console.log(possibility);
    }
});