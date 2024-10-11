/*
let PLACES = [{
    id: 1,
    name: 'Dranken Geers',
    rating: 3,
  },
  {
    id: 2,
    name: 'Irish Pub',
    rating: 2,
  },
  {
    id: 3,
    name: 'Loon',
    rating: 4,
  },
];

let TRANSACTIONS = [{
    id: 1,
    amount: -2000,
    date: '2021-05-08T00:00:00.000Z',
    user: {
      id: 1,
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: 2,
      name: 'Irish Pub',
    },
  },
  {
    id: 2,
    amount: -74,
    date: '2021-05-21T12:30:00.000Z',
    user: {
      id: 1,
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: 2,
      name: 'Irish Pub',
    },
  },
  {
    id: 3,
    amount: 3500,
    date: '2021-05-25T17:40:00.000Z',
    user: {
      id: 1,
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: 3,
      name: 'Loon',
    },
  },
];

module.exports = {
  TRANSACTIONS,
  PLACES
};
*/

let articles = [{
    id: 1,
    source: 'het nieuwsblad',
    title: 'Dit is de titel van het artikel',
    description: 'Dit is de beschrijving van het artikel',
    url: 'https://hetnieuwsblad.be/artikel',
    date: '2022-12-01T00:00:00.000Z',
  },
  {
    id: 2,
    source: 'de standaard',
    title: 'Dit is de titel van het artikel',
    description: 'Dit is de beschrijving van het artikel',
    url: 'https://standaard.be/artikel',
    date: '2022-12-08T00:00:00.000Z',
  },
  {
    id: 3,
    source: 'de morgen',
    title: 'Dit is de titel van het artikel',
    description: 'Dit is de beschrijving van het artikel',
    url: 'https://demorgen.be/artikel',
    date: '2022-12-15T00:00:00.000Z',
  },
];
let authors = [{
    id: 1,
    firstName: 'Thomas',
    lastName: 'Aelbrecht',
  },
  {
    id: 2,
    firstName: 'Jef',
    lastName: 'Janssens',
  },
  {
    id: 3,
    firstName: 'Karel',
    lastName: 'De Smet',
  },
];
let categories = [{
    id: 1,
    name: 'sport',
  },
  {
    id: 2,
    name: 'politiek',
  },
  {
    id: 3,
    name: 'economie',
  },
];
let articleCategories = [{
    articleId: 1,
    categoryId: 1,
  },
  {
    articleId: 2,
    categoryId: 2,
  },
  {
    articleId: 3,
    categoryId: 3,
  },
];

module.exports = {
  articles,
  authors,
  categories,
  articleCategories,
};