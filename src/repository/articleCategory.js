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
}

const SELECT_COLUMNS = [
  'article_id', 'category_id'
];
const formatArticleCategory = ({
  article_id,
  category_id
}) => ({
  article_id,
  category_id
});

const getAll = async () => {
  const articleCategories = await getKnex()(tables.articleCategory)
    .select(SELECT_COLUMNS);
  return articleCategories.map(formatArticleCategory);
}

const create = async ({
  article_id,
  category_id
}) => {
  try {
    await getKnex()(tables.articleCategory).insert({
      article_id,
      category_id
    })
  } catch (error) {
    debugLog('creation failed', {
      error
    });

    throw new Error('creation failed');
  }
}

const update = async (id, {
  article_id,
  category_id
}) => {
  try {
    await getKnex()(tables.articleCategory).where({
      article_id,
      category_id
    }).update({
      article_id,
      category_id
    })

  } catch (error) {
    debugLog('update failed', {
      error
    });

    throw new Error('update failed');
  }
}

const deleteId = async (article_id, category_id) => {
  try {
    await getKnex()(tables.articleCategory).where({
      article_id,
      category_id
    }).delete()

  } catch (error) {
    debugLog('delete failed', {
      error
    });

    throw new Error('delete failed');
  }
}
const getCount = async () => {
  debugLog('Fetching article count');
  const [count] = await getKnex()(tables.article).count();
  return count['count(*)'];
}

module.exports = {
  getAll,
  create,
  update,
  deleteId,
  getCount
};