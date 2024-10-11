const knex = require('knex');
const config = require('config');
const {
  getLogger
} = require('../core/logging');
const {
  join
} = require('path');
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};


const DATABASE_CLIENT = config.get('database.client');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const DATABASE_NAME = config.get('database.name');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';


let knexInstance;

const knexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else {
    logger.log(level, JSON.stringify(message));
  }
}



//connection with DB
const initializeDatabase = async () => {
  const logger = getLogger();
  const knexOptions = {
    client: DATABASE_CLIENT,
    debug: isDevelopment,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
    migrations: {
      directory: join('src', 'data', 'migrations'),
      tableName: 'knex-meta'
    },
    seeds: {
      directory: join('src', 'data', 'seeds'),
    },
    log: {
      debug: knexLogger(logger, 'debug'),
      warn: knexLogger(logger, 'warn'),
      error: knexLogger(logger, 'error'),

    }
  };
  knexInstance = knex(knexOptions);

  //control if db is up and running
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
    //connection delete
    await knexInstance.destroy();
    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    debugLog('error connecting to db', {
      error
    });
    throw new Error('error init db');
  }
  let knexMigrateFailed = true;

  try {
    await knexInstance.migrate.latest();
    knexMigrateFailed = false;
  } catch (error) {
    debugLog('error running migrations', {
      error
    });
  }

  if (knexMigrateFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      debugLog('migration failed', {
        error
      });
    }
    throw new Error('migration failed');
  }

  if (isDevelopment) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      debugLog('seeding failed', {
        error
      });
    }
  }

}

async function shutdownData() {
  const logger = getLogger();
  logger.info('Shutting down database connection');

  await knexInstance.destroy();
  knexInstance = null;
  logger.info('database connection close');
}


const getKnex = () => {
  if (!knexInstance)
    throw new Error('connection not yet initialized');
  return knexInstance;
}

const tables = Object.freeze({
  article: 'articles',
  author: 'authors',
  category: 'categories',
  articleCategory: 'articleCategories',
})

module.exports = {
  initializeDatabase,
  getKnex,
  tables,
  shutdownData
}