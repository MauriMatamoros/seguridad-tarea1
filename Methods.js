const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let stringToArray = (string) => {
    let array = [];
    for (i = 0; i < string.length; i++) { 
        array.push(string.charAt(i));
    }
    return array;
};

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

let decode = (array, possibilities) => {
    for (let i = 0; i < alphabet.length; i++) {
        possibilities.push(shiftOne(array));
        array = stringToArray(shiftOne(array))
    }
};

module.exports = {
    stringToArray,
    shiftOne,
    decode
}