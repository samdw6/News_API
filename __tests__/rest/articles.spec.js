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
  articles: [{
      id: 1,
      source: 'source1',
      title: 'title1',
      description: 'description1',
      url: 'url1',
      date: new Date(2021, 4, 8, 20, 0),
      author_id: 10
    },
    {
      id: 2,
      source: 'source2',
      title: 'title2',
      description: 'description2',
      url: 'url2',
      date: new Date(2021, 2, 8, 20, 0),
      author_id: 10
    },
    {
      id: 3,
      source: 'source3',
      title: 'title3',
      description: 'description3',
      url: 'url3',
      date: new Date(2021, 8, 8, 20, 0),
      author_id: 10
    },
    {
      id: 4,
      source: 'source4',
      title: 'title4',
      description: 'description4',
      url: 'url4',
      date: new Date(2021, 6, 8, 20, 0),
      author_id: 10
    },
    {
      id: 5,
      source: 'source5',
      title: 'title5',
      description: 'description5',
      url: 'url5',
      date: new Date(2021, 4, 8, 20, 0),
      author_id: 20
    }
  ],
  authors: [{
      id: 10,
      firstName: 'vntest10',
      lastName: 'lntest10'
    },
    {
      id: 20,
      firstName: 'vntest20',
      lastName: 'lntest20'
    }
  ]
}

const dataToDelete = {
  articles: [1, 2, 3, 4, 5],
  authors: [10, 20]
}



describe('articles', () => {
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

  const url = '/api/article/';

  describe('GET /api/articles', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
      await knex(tables.article).insert(data.articles);
    })
    afterAll(async () => {
      await knex(tables.article).whereIn('id', dataToDelete.articles).del();
      await knex(tables.author).whereIn('id', dataToDelete.authors).del();
    })
    it('should return 200', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(5);

    })
  })


  describe('POST /api/articles', () => {
    let articleToDelete = [];
    beforeAll(
      async () => {
        await knex(tables.author).insert(data.authors);
      }
    )
    afterAll(
      async () => {
        await knex(tables.article).whereIn('id', articleToDelete).delete();
        await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
      })
    it('should return 201 and the newly created article', async () => {
      const toSend = {
        source: data.articles[0].source,
        title: data.articles[0].title,
        description: data.articles[0].description,
        url: data.articles[0].url,
        date: data.articles[0].date,
        author_id: data.articles[0].author_id
      }
      const response = await request.post(url).set('Authorization', authHeader).send(toSend);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.source).toBe('source1');
      expect(response.body.title).toBe('title1');
      expect(response.body.description).toBe('description1');
      expect(response.body.url).toBe('url1');
      expect(response.body.date).toBe('2021-05-08T18:00:00.000Z');
      expect(response.body.author_id).toBe(10);
      articleToDelete.push(response.body.id);
    })
  })




  describe('PUT /api/articles/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
      await knex(tables.article).insert(data.articles[0]);
    })
    afterAll(async () => {
      await knex(tables.article).whereIn('id', dataToDelete.articles).delete();
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();

    });
    it('it should be 200 and return updated article', async () => {
      const toSend = {
        source: data.articles[1].source,
        title: data.articles[1].title,
        description: data.articles[1].description,
        url: data.articles[1].url,
        date: data.articles[1].date,
        author_id: data.articles[1].author_id
      }
      const response = await request.put(url + data.articles[0].id).set('Authorization', authHeader).send(toSend);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.source).toBe('source2');
      expect(response.body.title).toBe('title2');
      expect(response.body.description).toBe('description2');
      expect(response.body.url).toBe('url2');
      expect(response.body.date).toBe('2021-03-08T19:00:00.000Z');
      expect(response.body.author_id).toBe(10);
    })
  })

  describe('DELETE /api/articles/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
      await knex(tables.article).insert(data.articles[0]);
    })
    afterAll(async () => {
      await knex(tables.article).whereIn('id', dataToDelete.articles).delete();
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    })
    it('should return 204', async () => {
      const response = await request.delete(url + data.articles[0].id).set('Authorization', authHeader);
      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/articles/:id', () => {
    beforeAll(async () => {
      await knex(tables.author).insert(data.authors);
      await knex(tables.article).insert(data.articles[0]);
    })
    afterAll(async () => {
      await knex(tables.article).whereIn('id', dataToDelete.articles).delete();
      await knex(tables.author).whereIn('id', dataToDelete.authors).delete();
    })
    it('should return 200 and the article', async () => {
      const response = await request.get(url + data.articles[0].id).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.source).toBe('source1');
      expect(response.body.title).toBe('title1');
      expect(response.body.description).toBe('description1');
      expect(response.body.url).toBe('url1');
      expect(response.body.date).toBe('2021-05-08T18:00:00.000Z');
      expect(response.body.author_id).toBe(10);
    })

  })



});