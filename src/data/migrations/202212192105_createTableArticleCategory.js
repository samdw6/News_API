const {
  tables
} = require('../index');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.articleCategory, (table) => {
      table.increments('id');
      table.integer('article_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.foreign('article_id', 'fk_articleCategory_article').references(`${tables.article}.id`).onDelete('CASCADE');
      table.foreign('category_id', 'fk_articleCategory_category').references(`${tables.category}.id`).onDelete('CASCADE');

    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.articleCategory);
  }
}