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

async function getPlateReadsByDateAndCamera(startDate, endDate, cameraName) {
  try {
    const lpr = await conectToDatabase();

    const records = await lpr.findAll({
        where: {
            Date: {
                [Sequelize.Op.between]: [startDate, endDate]
            },
            CameraName: cameraName
        }
    });
    const formattedRecords = records.map(record => record.dataValues);

    console.table(formattedRecords);
  } catch (error) {
    console.error('Error retrieving plate reads:', error);
    throw error;
  }
}


module.exports = { conectToDatabase, getPlateReadsByDateAndCamera };
