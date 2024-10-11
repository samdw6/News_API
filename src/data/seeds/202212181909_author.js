module.exports = {
  seed: async (knex) => {
    await knex('authors').delete();

    await knex('authors').insert([{
        id: 1,
        firstName: 'nicolas',
        lastName: 'dubois',
      },
      {
        id: 2,
        firstName: 'max',
        lastName: 'milan',
      },
      {
        id: 3,
        firstName: 'jimmy',
        lastName: 'bao',
      }
    ]);
  }
};