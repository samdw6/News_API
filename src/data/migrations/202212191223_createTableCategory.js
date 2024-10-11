const {
  tables
} = require('../index');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.category, (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.category);
  }
};