const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const {
  initializeLogger,
  getLogger
} = require('./core/logging');
const installRest = require('./rest/index');
const {
  initializeDatabase,
  shutdownData
} = require('./data/index');
const koaCors = require('@koa/cors');
const swaggerJsdoc = require('swagger-jsdoc');
const {
  koaSwagger
} = require('koa2-swagger-ui');
const swaggerOptions = require('../swagger.config');
const {
  checkJwtToken
} = require('./core/auth');


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');

module.exports = async function createServer() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    isProduction: NODE_ENV === 'production',
    defaultMeta: {
      NODE_ENV
    },
  });
  await initializeDatabase();
  const app = new Koa();
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        return CORS_ORIGINS[0];
      },

      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );

  const logger = getLogger();

  app.use(checkJwtToken());

  app.use(async (ctx, next) => {
    const logger = getLogger();
    logger.debug(ctx.headers.authorization);
    logger.debug(JSON.stringify(ctx.state.user));
    logger.debug(ctx.state.jwtOriginalError);
    await next();
  });

  app.use(bodyParser());


  const spec = swaggerJsdoc(swaggerOptions);
  app.use(
    koaSwagger({
      routePrefix: '/swagger', // host at /swagger instead of default /docs
      specPrefix: '/swagger/spec', // route where the spec is returned
      exposeSpec: true, // expose spec file
      swaggerOptions: { // passed to SwaggerUi()
        spec,
      },
    }),
  );


  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = config.get('port');
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve()
      });
    },

    async stop() {
      app.removeAllListeners();
      await shutdownData();
      getLogger().info('Goodbye');
    }
  }
};