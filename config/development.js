module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  database: {
    host: '127.0.0.1',
    client: 'mysql2',
    port: 3306,
    database: 'budget',
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
}