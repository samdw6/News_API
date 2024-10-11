module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex('articleCategories').delete();

    // then add the fresh articleCategory
    await knex('articleCategories').insert([{
        article_id: 1,
        category_id: 1
      },
      {
        article_id: 1,
        category_id: 2
      },
      {
        article_id: 1,
        category_id: 3
      },
    ]);
  }
};