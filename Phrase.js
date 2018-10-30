var colors = require('colors/safe');

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

module.exports = Phrase;