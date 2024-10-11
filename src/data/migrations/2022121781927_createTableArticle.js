const {
  tables
} = require('../index');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.article, (table) => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('description');
      table.string('source', 255).notNullable();
      table.string('url', 255).notNullable();
      table.dateTime('date');
      table.integer('author_id').unsigned().notNullable();
      table.foreign('author_id', 'fk_article_author').references(`${tables.author}.id`).onDelete('CASCADE');

    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.article);

  }
};