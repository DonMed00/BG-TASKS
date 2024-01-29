const watcher = require('./watcher');
//const dbQueries = require('./dbQueries');



async function mainMenu() {
    const inquirer = await import('inquirer').then(module => module.default);

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What action would you like to perform?',
        choices: ['Start File Monitoring', 'Perform Data Queries', 'Exit'],
    });

    switch (answer.action) {
        case 'Start File Monitoring':
            watcher.startMonitoring();
            break;
        case 'Perform Data Queries':
           // await dbQueries.performQuery();
            break;
        case 'Exit':
            process.exit();
    }

    await mainMenu();
}

mainMenu();
