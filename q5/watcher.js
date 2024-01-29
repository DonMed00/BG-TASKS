const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs').promises;
const sequelize = require('./sequelize');
let lpr;
const directoryACSOutputTest = path.join(__dirname, 'ACS Output Test');

async function startMonitoring() {
  try {
    lpr = await sequelize.conectToDatabase();
    watchDirectory();
  } catch (error) {
    console.error('Error starting the monitoring service:', error);
  }
}

function watchDirectory() {
  const watcher = chokidar.watch(directoryACSOutputTest, {
    persistent: true,
  });

  watcher.on('add', (filePath) => {
    if (filePath.endsWith('.lpr')) {
      processLPRFile(filePath);
    }
  });

  watcher.on('error', (error) => {
    console.error(`Error in watcher: ${error}`);
  });
}

async function processLPRFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    await processLPR(content);
  } catch (error) {
    console.error(`Error reading file "${filePath}":`, error);
  }
}

async function processLPR(data) {
  const record = parseLPRData(data);
  if (!record) {
    console.error('The data format is incorrect.');
    return;
  }

  try {
    const exists = await verifyRecordExistence(record);
    if (exists) {
      console.log('The record already exists in the database.');
    } else {
      await insertLPRRecord(record);
    }
  } catch (error) {
    console.error('Error processing LPR data:', error);
  }
}

function parseLPRData(data) {
  const parts = data.split(/[\\/]/);
  if (parts.length !== 7) {
    return null;
  }
  return {
    CountryOfVehicle: parts[0],
    RegNumber: parts[1],
    ConfidenceLevel: parts[2],
    CameraName: parts[3],
    Date: convertToDate(parts[4]),
    Time: parts[5],
    ImageFilename: parts[6],
  };
}

async function insertLPRRecord(record) {
  try {
    await lpr.create(record);
    console.log('Data inserted successfully in the "lpr" table.');
  } catch (error) {
    console.error('Error inserting data into the "lpr" table:', error);
  }
}



function convertToDate(dateString) {
  const year = parseInt(dateString.substr(0, 4), 10);
  const month = parseInt(dateString.substr(4, 2), 10) - 1;
  const day = parseInt(dateString.substr(6, 2), 10);
  const date = new Date(year, month, day);
  return date;
}

async function verifyRecordExistence(record) {
  try {
    const result = await lpr.findOne({
      where: {
        CountryOfVehicle: record.CountryOfVehicle,
        RegNumber: record.RegNumber,
        ConfidenceLevel: record.ConfidenceLevel,
        CameraName: record.CameraName,
        Date: record.Date,
        Time: record.Time,
        ImageFilename: record.ImageFilename,
      },
    });

    return result !== null;
  } catch (error) {
    console.error('Error verifying the existence of the record:', error);
    return false;
  }
}
module.exports =  { startMonitoring };