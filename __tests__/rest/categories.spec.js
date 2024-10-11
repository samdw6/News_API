const supertest = require("supertest");
const createServer = require("../../src/createServer");
const {
  getKnex,
  tables
} = require('../../src/data/index');
const {
  withServer
} = require('../helpers');

const data = {
  categories: [{
      id: 1,
      name: 'category1'
    },
    {
      id: 2,
      name: 'category2'
    },
    {
      id: 3,
      name: 'category3'
    }
  ]
};

const dataToDelete = {
  categories: [1, 2, 3]
};

describe('categories', () => {
  let authHeader;
  let request
  let knex;

  withServer(({
    knex: k,
    request: r,
    authHeader: a
  }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = '/api/category/';

  describe('GET /api/categories', () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
    });
    afterAll(async () => {
      await knex(tables.category).whereIn('id', dataToDelete.categories).delete();
    });
    it('should return 200 and all categories', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(2);
    });
  });

  describe('POST /api/categories', () => {
    let categoriesToDelete = [];
    it('should return 201 and created category', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        name: 'category4'
      });
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('category4');
      categoriesToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/categories/:id', () => {
    beforeAll(
      async () => {
        await knex(tables.category).insert(data.categories);
      }
    );
    afterAll(
      async () => {
        await knex(tables.category).whereIn('id', dataToDelete.categories).delete();
      }
    );
    it('should return 200 and updated category', async () => {
      const response = await request.put(`${url}1`).set('Authorization', authHeader).send({
        name: 'category1_updated'
      });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('category1_updated');
    });
  });

  describe('DELETE /api/categories/:id', () => {
    beforeAll(
      async () => {
        await knex(tables.category).insert(data.categories);
      }
    );
    afterAll(
      async () => {
        await knex(tables.category).whereIn('id', dataToDelete.categories).delete();
      }
    );
    it('should return 204 and deleted category', async () => {
      const response = await request.delete(`${url}1`).set('Authorization', authHeader);
      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/categories/:id', () => {
    beforeAll(
      async () => {
        await knex(tables.category).insert(data.categories);
      }
    );
    afterAll(
      async () => {
        await knex(tables.category).whereIn('id', dataToDelete.categories).delete();
      }
    );
    it('should return 200 and category', async () => {
      const response = await request.get(`${url}1`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('category1');
    });

  })
});