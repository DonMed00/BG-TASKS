const { Sequelize, DataTypes } = require('sequelize');


async function conectToDatabase() {
    const sequelize = await initSequalize();
    const lpr = await initLprTable(sequelize);

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
    const sequelize = await initSequalize();
    const lpr = await initLprTable(sequelize);

    const records = await lpr.findAll({
        where: {
            Date: {
                [Sequelize.Op.between]: [startDate, endDate]
            },
            CameraName: cameraName
        }
    });
    const formattedRecords = records.map(record => record.dataValues);

    formattedRecords.length != 0 ? console.table(formattedRecords): console.log("No plates that match these parameters.");
  } catch (error) {
    console.error('Error retrieving plate reads:', error);
    throw error;
  }
}

function initLprTable(sequelize){
  return sequelize.define('lpr', {
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
}
function initSequalize(){
  return new Sequelize('postgres://postgres:admin@localhost:5432/lpr_database', {
    dialect: 'postgres',
});
}


module.exports = { conectToDatabase, getPlateReadsByDateAndCamera, initSequalize };
