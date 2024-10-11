const {
  tables
} = require('../index');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.author, (table) => {

      table.increments('id');
      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();

    })
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.author);
  }
};