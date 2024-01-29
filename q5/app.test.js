const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const chokidar = require('chokidar');
const path = require('path');
const watcher = require('./watcher');
jest.mock('sequelize');

describe('conectToDatabase', () => {
    it('should connect to the database and start watching the directory for new .lpr files', async () => {
     
      const directoryACSOutputTest = path.join(__dirname, 'ACS Output Test');

      const mockSequelize = jest.spyOn(sequelize, 'conectToDatabase').mockResolvedValue();
      const mockWatcher = jest.spyOn(chokidar, 'watch').mockReturnValue({
        on: jest.fn(),
      });
  
      await watcher.startMonitoring();
  
      expect(mockSequelize).toHaveBeenCalled();
      expect(mockWatcher).toHaveBeenCalledWith(directoryACSOutputTest, {
        persistent: true,
      });      
    });

    it('should return a new Sequelize instance', () => {
      const sequelizeResult = sequelize.initSequalize();
      expect(sequelizeResult).toBeInstanceOf(Sequelize);
    });


    it('should create a watcher object with the correct directory path and persistent option', () => {
      const directoryACSOutputTest = path.join(__dirname, 'ACS Output Test');

      expect(chokidar.watch).toHaveBeenCalledWith(directoryACSOutputTest, {
        persistent: true,
      });
    });
  
});



