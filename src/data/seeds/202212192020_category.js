module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex('categories').delete();

    // then add the fresh category
    await knex('categories').insert([{
        id: 1,
        name: 'sport'
      },
      {
        id: 2,
        name: 'politiek'
      },
      {
        id: 3,
        name: 'economie'
      },
    ]);
  }
};