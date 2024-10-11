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
  authors: [{
      id: 1,
      firstName: 'vntest1',
      lastName: 'lntest1'
    },
    {
      id: 2,
      firstName: 'vntest2',
      lastName: 'lntest2'
    },
    {
      id: 3,
      firstName: 'vntest3',
      lastName: 'lntest3'
    }
  ]
};

const dataToDelete = {
  authors: [1, 2, 3]
};

describe('authors', () => {
  let authHeader;
  let request;
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

  const url = '/api/author/';

  describe('GET /api/authors', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
    });
    afterAll(async () => {
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    });
    it('should return 200 and all authors', async () => {
      const response = await request.get(url).set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(3);

    });
  });

  describe('POST /api/authors', () => {
    let authorToDelete = [];
    it('should return 201 and created author', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        firstName: 'vntest4',
        lastName: 'lntest4'
      });
      expect(response.status).toBe(201);
      expect(response.body.firstName).toBe('vntest4');
      expect(response.body.lastName).toBe('lntest4');
      authorToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/authors/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
    });
    afterAll(async () => {
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    });
    it('should return 200 and updated author', async () => {
      const toSend = {
        firstName: data.authors[0].firstName,
        lastName: data.authors[0].lastName
      }
      const response = await request.put(url + data.authors[0].id).set('Authorization', authHeader).send(toSend);
      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe(toSend.firstName);
      expect(response.body.lastName).toBe(toSend.lastName);
    })
  });
  describe('DELETE /api/authors/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
    })
    afterAll(async () => {
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    })
    it('should return 204 and deleted author', async () => {
      const response = await request.delete(url + data.authors[0].id).set('Authorization', authHeader);
      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/authors/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
    })
    afterAll(async () => {
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    })
    it('should return 200 and author', async () => {
      const response = await request.get(url + data.authors[0].id).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe(data.authors[0].firstName);
      expect(response.body.lastName).toBe(data.authors[0].lastName);
    });
  })

});