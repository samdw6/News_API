module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex('articles').delete();

    // then add the fresh articles
    await knex('articles').insert([{
        id: 1,
        source: 'het nieuwsblad',
        title: 'Deze 5 dingen moet je weten over de nieuwe corona-maatregelen',
        url: 'https://www.nieuwsblad.be/cnt/dmf20221218_98200001',
        description: 'De nieuwe coronamaatregelen zijn vanaf vandaag van kracht. De belangrijkste maatregelen op een rijtje.',
        date: new Date(2021, 3, 25, 09, 21),
        author_id: 1

      },
      {
        id: 2,
        source: 'de standaard',
        title: 'Argentijnse voetballer overleden na botsing met tegenstander',
        url: 'https://www.standaard.be/cnt/dmf20221218_98200001',
        description: 'De Argentijnse voetballer Emiliano Sala is om het leven gekomen bij een vliegtuigongeluk. De piloot van het vliegtuig is ook omgekomen.',
        date: new Date(2021, 5, 25, 19, 43),
        author_id: 2
      },
      {
        id: 3,
        source: 'de morgen',
        title: 'Dit is de titel van het artikel',
        url: 'https://www.demorgen.be',
        description: 'Dit is de beschrijving van het artikel',
        date: new Date(2021, 11, 25, 20, 10),
        author_id: 1
      },
    ]);
  },
};