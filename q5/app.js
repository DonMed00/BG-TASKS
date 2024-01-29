const watcher = require('./watcher');
const sequelize = require('./sequelize');
let inquirer;

async function mainMenu() {
    inquirer = await import('inquirer').then(module => module.default);
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
            await performDataQueries();
            break;
        case 'Exit':
            process.exit();
    }

    await mainMenu();
}

async function performDataQueries() {
    const questions = [
        {
            type: 'input',
            name: 'startDate',
            message: 'Enter the start date (YYYY-MM-DD):',
            validate: function(value) {
                const pass = value.match(
                    /^\d{4}-\d{2}-\d{2}$/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter a valid date (YYYY-MM-DD).';
            },
        },
        {
            type: 'input',
            name: 'endDate',
            message: 'Enter the end date (YYYY-MM-DD):',
            validate: function(value) {
                const pass = value.match(
                    /^\d{4}-\d{2}-\d{2}$/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter a valid date (YYYY-MM-DD).';
            },
        },
        {
            type: 'input',
            name: 'cameraName',
            message: 'Enter the camera name:',
        }
    ];
    const answers = await inquirer.prompt(questions);
    await sequelize.getPlateReadsByDateAndCamera(new Date(answers.startDate), new Date(answers.endDate), answers.cameraName);
}

mainMenu();
