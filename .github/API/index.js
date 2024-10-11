const koa = require('koa');
const config = require('config');
const {
  getlogger
} = require('./logger');



c
const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)

const app = new koa();
const logger = getlogger();

app.use(async (ctx, next) => {
  logger.info(JSON.stringify(ctx.request));
  if (ctx.request.method === 'GET' && ctx.request.url === '/api/transactions') {

  } else {
    ctx.body = 'goodbye World';
  }
  next();
});

logger.info('Server listening on https://localhost:9000');
app.listen(9000);