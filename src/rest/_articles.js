const Joi = require('joi');
const Router = require('@koa/router');
const articleService = require('../service/article');
const validate = require('./_validation.js');
const {
  hasPermission,
  permissions
} = require('../core/auth');



/**
 * @openapi
 * tags:
 *   name: Articles
 *   description: Represents an article
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ArticlesList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Article"
 * 
 */

/**
 * @openapi
 * components:
 *   requestBodies:
 *     InputArticle:
 *       description: The article to create or update
 *       required: True
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - "title"
 *               - "description"
 *               - "source"
 *               - "url"
 *               - "date"
 *               - "author_id"
 *             properties:
 *               "title":
 *                 type: string
 *                 description: The title of the article
 *                 example: 'nieuwe wereldkampioen voetbal'
 *               "description":
 *                 type: string
 *                 description: The description of the article
 *                 example: 'Argentinie kampioen'
 *               "source":
 *                 type: string
 *                 description: The source of the article
 *                 example: 'Het nieuwsblad'
 *               "url":
 *                 type: string
 *                 description: The url of the article
 *                 example: 'https://hetnieuwsblad.be'
 *               "date":
 *                 type: string
 *                 format: date-time
 *                 description: The date the account was created
 *                 example: "2021-05-28T14:27:32.534Z"
 *               "author_id":
 *                 $ref: "#/components/schemas/Author"
 */








/**
 * @openapi
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ArticleList"
 */


const getArticles = async (ctx) => {
  ctx.body = await articleService.getAll();
}
getArticles.validationScheme = null;


/**
 * @openapi
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     description: Creates a new article
 *     tags:
 *       - Articles
 *     requestBody:
 *       $ref: "#/components/requestBodies/Article"
 *     responses:
 *       201:
 *         description: The created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No place with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const createArticles = async (ctx) => {
  const newArticle = await articleService.create({
    ...ctx.request.body,
    author_id: Number(ctx.request.body.author_id),
    date: new Date(ctx.request.body.date)
  });
  ctx.body = newArticle;
  ctx.status = 201;
}
createArticles.validationScheme = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required(),
    date: Joi.date().required(),
    author_id: Joi.number().required()
  })
};

/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: Get a single article
 *     tags:
 *      - Articles
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       404:
 *         description: No article with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getArticleById = async (ctx) => {
  ctx.body = await articleService.getById(ctx.params.id);
}
getArticleById.validationScheme = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

/**
 * @openapi
 * /api/article/{id}:
 *   delete:
 *     summary: Delete a article
 *     tags:
 *      - Article
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No article with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteArticle = async (ctx) => {
  await articleService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
}
deleteArticle.validationScheme = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

/**
 * @openapi
 * /api/article/{id}:
 *   put:
 *     summary: Update an existing article
 *     tags:
 *      - Articles
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Articles"
 *     responses:
 *       200:
 *         description: The updated article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No article/author with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const updateArticle = async (ctx) => {
  ctx.body = await articleService.update(ctx.params.id, {
    ...ctx.request.body,
    author_id: Number(ctx.request.body.author_id),
    date: new Date(ctx.request.body.date)
  });
  ctx.status = 200;
}
updateArticle.validationScheme = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required(),
    date: Joi.date().required(),
    author_id: Joi.number().required()
  })
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/article'
  });
  router.get('/',hasPermission(permissions.read), validate(getArticles.validationScheme), getArticles);
  router.get('/:id',hasPermission(permissions.read), validate(getArticleById.validationScheme), getArticleById);
  router.post('/',hasPermission(permissions.write), validate(createArticles.validationScheme), createArticles);
  router.delete('/:id',hasPermission(permissions.write), validate(deleteArticle.validationScheme), deleteArticle);
  router.put('/:id',hasPermission(permissions.write), validate(updateArticle.validationScheme), updateArticle);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}