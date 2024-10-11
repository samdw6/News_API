const installTransactionRouter = require('./_articles');
const installAuthorsRouter = require('./_authors');
const installHealthRouter = require('./_health');
const installCategoriesRouter = require('./_categories');
const installArticleCategoriesRouter = require('./_articleCategories');
const Router = require('@koa/router');

/**
 * @openapi
 * components:
 *   schemas:
 *     Base:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type:integer
 *           format:"int32"
 *         example:
 *           id:123
 *     ListResponse:
 *       required:
 *         - count
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of items returned
 *           example: 1
 * 
 */




module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });
  installTransactionRouter(router);
  installAuthorsRouter(router);
  installCategoriesRouter(router);
  installArticleCategoriesRouter(router);
  installHealthRouter(router);
  app
    .use(router.routes())
    .use(router.allowedMethods());
}