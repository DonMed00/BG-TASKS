const readline = require('readline');
const { quicksort } = require('./quicksort');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the elements separated by space(Max 10): ', elements => {
    let array = elements.split(' ').map(Number).slice(0, 10);
    console.log('Entered elements:', array);
    console.log('Sorted elements:', quicksort(array));
    rl.close();
});