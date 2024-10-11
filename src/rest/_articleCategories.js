const Router = require('@koa/router');
const articleCategoryService = require('../service/articleCategory');

const Joi = require('joi');
const validate = require('./_validation.js');
const {
  hasPermission,
  permissions
} = require('../core/auth');

/**
 * @openapi
 * tags:
 *   name: ArticleCategories
 *   description: Represents a articleCategory
 */



/**
 * @openapi
 * /api/articleCategories:
 *   get:
 *     summary: Get all articleCategory
 *     tags:
 *      - ArticleCategories
 *     responses:
 *       200:
 *         description: List of articleCategories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ArticleCategoriesList"
 */

const getArticleCategories = async (ctx) => {
  ctx.body = await articleCategoryService.getAll();
}
getArticleCategories.validationScheme = null;
/**
 * @openapi
 * /api/articleCategories:
 *   post:
 *     summary: Create a new articleCategory
 *     description: Creates a new articleCategory 
 *     tags:
 *      - ArticleCategories
 *     requestBody:
 *       $ref: "#/components/requestBodies/ArticleCategory"
 *     responses:
 *       200:
 *         description: The created articleCategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ArticleCategory"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No article/category with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const createArticleCategories = async (ctx) => {
  const newArticleCategory = await articleCategoryService.create({
    ...ctx.request.body,
    article_id: Number(ctx.request.body.article_id),
    category_id: Number(ctx.request.body.category_id)
  });
  ctx.body = newArticleCategory;
  ctx.status = 201;
}
createArticleCategories.validationScheme = {
  body: {
    article_id: Joi.number().required(),
    category_id: Joi.number().required()
  }
};

/**
 * @openapi
 * /api/articleCategories/{id}:
 *   delete:
 *     summary: Delete a articleCategory
 *     tags:
 *      - ArticleCategories
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No articleCategory with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */
const deletedArticleCategory = async (ctx) => {
  await articleCategoryService.deleteId(ctx.params.article_id, ctx.params.category_id);
  ctx.status = 204; // no content
}
deletedArticleCategory.validationScheme = {
  params: {
    article_id: Joi.number().required(),
    category_id: Joi.number().required()
  }
}

/**
 * @openapi
 * /api/articleCategories/{id}:
 *   put:
 *     summary: Update an existing articleCategory
 *     tags:
 *      - ArticleCategories
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/ArticleCategory"
 *     responses:
 *       200:
 *         description: The updated articleCategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ArticleCategory"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No articleCategory/article_id/category_id with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const updateArticleCategory = async (ctx) => {
  ctx.body = await articleCategoryService.update(ctx.params.article_id, ctx.params.category_id, {
    ...ctx.request.body,
    article_id: Number(ctx.request.body.article_id),
    category_id: Number(ctx.request.body.category_id)
  });
  ctx.status = 200;
}
updateArticleCategory.validationScheme = {
  params: {
    article_id: Joi.number().required(),
    category_id: Joi.number().required()
  },
  body: {
    article_id: Joi.number().required(),
    category_id: Joi.number().required()
  }
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/articleCategory'
  });
  router.get('/', hasPermission(permissions.read), validate(getArticleCategories.validationScheme), getArticleCategories);
  router.post('/', hasPermission(permissions.write), validate(createArticleCategories.validationScheme), createArticleCategories);
  router.delete('/:article_id/:category_id', hasPermission(permissions.write), validate(deletedArticleCategory.validationScheme), deletedArticleCategory);
  router.put('/:article_id/:category_id', hasPermission(permissions.write), validate(updateArticleCategory.validationScheme), updateArticleCategory);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}