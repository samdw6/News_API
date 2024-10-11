const config = require('config');
const {
  initializeDatabase
} = require('../src/data/index');
const {
  initializeLogger
} = require('../src/core/logging');

module.exports = async () => {
  // Initialize the logger (required when initializing the data layer)
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  // Create a database connection (needed to insert test data or cleanup after tests)
  await initializeDatabase();
};