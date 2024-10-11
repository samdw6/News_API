const {
  getKnex,
  tables
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const SELECT_COLUMNS = [
  `${tables.article}.id`, 'source', 'title', 'description', 'url', 'date', 'author_id'
];

const formatArticle = ({
  id,
  ...rest

}) => ({
  id,
  ...rest
});


const getById = async (id) => {
  const article = await getKnex()(tables.article)
    .first(SELECT_COLUMNS)
    .where(`${tables.article}.id`, id);
  return article && formatArticle(article);
}
const create = async ({
  source,
  title,
  description,
  url,
  date,
  author_id
}) => {
  try {
    const [id] = await getKnex()(tables.article).insert({
      source,
      title,
      description,
      url,
      date,
      author_id: author_id
    })
    return await getById(id);
  } catch (error) {
    debugLog('creation failed', {
      error
    });

    throw new Error('creation failed');
  }
}

const getAll = async () => {
  const article = await getKnex()(tables.article)
    .select(SELECT_COLUMNS)
    .orderBy('date', 'desc');
  return article.map(t => formatArticle(t));
}

const update = async (id, {
  source,
  title,
  description,
  url,
  date,
  author_id
}) => {
  try {

    await getKnex()(tables.article).update({
        source,
        title,
        description,
        url,
        date,
        author_id: author_id
      })
      .where(`${tables.article}.id`, id);
    return await getById(id);

  } catch (error) {
    debugLog('update failed', {
      error
    });

    throw new Error('update failed');

  }
};

const deleteById = async (id) => {
  try {
    const rowsDeleted = await getKnex()(tables.article)
      .delete()
      .where(`${tables.article}.id`, id);
    return rowsDeleted > 0;
  } catch (error) {
    debugLog('delete failed', {
      error
    });
  }
};
const getCount = async () => {
  debugLog('Fetching article count');
  const [count] = await getKnex()(tables.article).count();
  return count['count(*)'];
}



module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getCount,
}