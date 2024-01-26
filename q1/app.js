const readline = require('readline');
const { isPalindrome } = require('./palindrome');

const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a word or number to check if it is a palindrome: ', (input) => {
    const result = isPalindrome(input) ? 'is a palindrome.' : 'is not a palindrome.';
    console.log(`"${input}" ${result}`);
    rl.close();
})