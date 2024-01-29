const { Sequelize, DataTypes } = require('sequelize');

async function conectToDatabase() {
    const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/lpr_database', {
        dialect: 'postgres',
    });

    const lpr = sequelize.define('lpr', {
        CountryOfVehicle: DataTypes.STRING,
        RegNumber: DataTypes.STRING,
        ConfidenceLevel: DataTypes.STRING,
        CameraName: DataTypes.STRING,
        Date: DataTypes.DATE,
        Time: DataTypes.TIME,
        ImageFilename: DataTypes.STRING,
    }, {
        tableName: 'lpr'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection successfully established.');

        await sequelize.sync({ force: false });
        console.log('Table synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    return lpr;
}

module.exports = conectToDatabase;
