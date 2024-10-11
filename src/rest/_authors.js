const Joi = require('joi');
const Router = require('@koa/router');
const authorService = require('../service/author');
const validate = require('./_validation.js');
const {
  hasPermission,
  permissions
} = require('../core/auth');

/**
 * @openapi
 * tags:
 *   name: Authors
 *   description: Represents an article
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - firstName
 *             - lastName
 *           properties:
 *             firstName:
 *               type: "string"
 *             lastName:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Author"
 *     AuthorsList:
 *       allOf:
 *         - $ref: "#/components/schemas/ListResponse"
 *         - type: object
 *           required:
 *             - items
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Author"
 *   examples:
 *     Author:
 *       id: 123
 *       firstName: "sam"
 *       lastName: "de waegeneer"
 *   requestBodies:
 *     Author:
 *       description: The author info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "sam"
 *               lastName:
 *                 type: string
 *                 example: "de waegeneer"
 */




/**
 * 
 * @openapi
 * /api/authors:
 *    get:
 *      summary: Get all authors
 *      tags:
 *        - Authors
 *      responses:
 *        200:
 *          description: List of authors
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/AuthorsList"
 */



const getAuthors = async (ctx) => {
  ctx.body = await authorService.getAll();
}
getAuthors.validationScheme = {
  params: Joi.object({
    id: Joi.string().optional()
  })
};
/**
 * @openapi
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       $ref: "#/components/requestBodies/Author"
 *     responses:
 *       201:
 *         description: The created author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Author"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No author with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const createAuthor = async (ctx) => {
  const newAuthor = await authorService.create({
    ...ctx.request.body,
  });
  ctx.body = newAuthor;
  ctx.status = 201;
}
createAuthor.validationScheme = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

/**
 * @openapi
 * /api/authors/{id}:
 *   get:
 *     summary: Get a single author
 *     tags:
 *      - Authors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Author"
 *       404:
 *         description: No author with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const getAuthorById = async (ctx) => {
  ctx.body = await authorService.getById(ctx.params.id);
}
getAuthorById.validationScheme = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

/**
 * @openapi
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete a author
 *     tags:
 *      - Authors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       404:
 *         description: No authors with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const deleteAuthor = async (ctx) => {
  await authorService.deleteById(ctx.params.id);
  ctx.status = 204; // no content
}
deleteAuthor.validationScheme = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};


/**
 * @openapi
 * /api/authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *      - authors
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Author"
 *     responses:
 *       200:
 *         description: The updated author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Author"
 *       400:
 *         description: You provided invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/400BadRequest'
 *       404:
 *         description: No author with the given id could be found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/404NotFound'
 */

const updateAuthor = async (ctx) => {
  ctx.body = await authorService.update(ctx.params.id, {
    ...ctx.request.body,
  });
  ctx.status = 200;
}
updateAuthor.validationScheme = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/author'
  });
  router.get('/', hasPermission(permissions.read), validate(getAuthors.validationScheme), getAuthors);
  router.get('/:id', hasPermission(permissions.read), validate(getAuthorById.validationScheme), getAuthorById);
  router.post('/', hasPermission(permissions.write), validate(createAuthor.validationScheme), createAuthor);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteAuthor.validationScheme), deleteAuthor);
  router.put('/:id', hasPermission(permissions.write), validate(updateAuthor.validationScheme), updateAuthor);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}