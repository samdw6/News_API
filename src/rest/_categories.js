const Joi = require('joi');
const Router = require('@koa/router');
const categoryService = require('../service/category');
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
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CategoriesList"
 */


const getCategory = async (ctx) => {
  ctx.body = await categoryService.getAll();
}
getCategory.validationScheme = null;

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category
 *     tags:
 *      - Category
 *     requestBody:
 *       $ref: "#/components/requestBodies/Category"
 *     responses:
 *       200:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 */

const createCategory = async (ctx) => {
  const newArticle = await categoryService.create({
    ...ctx.request.body
  });
  ctx.body = newArticle;
  ctx.status = 201;
}
createCategory.validationScheme = {
  body: Joi.object({
    name: Joi.string().required()
  }),
};

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Get a single category
 *     tags:
 *      - Categories
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       404:
 *         description: No category with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getCategoryById = async (ctx) => {
  ctx.body = await categoryService.getById(ctx.params.id);
}
getCategoryById.validationScheme = {
  params: Joi.object({
    id: Joi.string().required()
  }),
};

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *      - Categories
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No category with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteCategory = async (ctx) => {
  await categoryService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
}
deleteCategory.validationScheme = {
  params: Joi.object({
    id: Joi.string().required()
  }),
};

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags:
 *      - Categories
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Category"
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No category with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const updateCategory = async (ctx) => {
  ctx.body = await categoryService.update(ctx.params.id, {
    ...ctx.request.body
  });
  ctx.status = 200;
}
updateCategory.validationScheme = {
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().required()
  }),
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/category'
  });
  router.get('/', hasPermission(permissions.read), validate(getCategory.validationScheme), getCategory);
  router.get('/:id', hasPermission(permissions.read), validate(getCategoryById.validationScheme), getCategoryById);
  router.post('/', hasPermission(permissions.write), validate(createCategory.validationScheme), createCategory);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteCategory.validationScheme), deleteCategory);
  router.put('/:id', hasPermission(permissions.write), validate(updateCategory.validationScheme), updateCategory);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}