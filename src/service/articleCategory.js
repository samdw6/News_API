const {
  getLogger
} = require('../core/logging');
let {
  articleCategories
} = require('../data/mock-data');
const articleCategoryRepo = require('../repository/articleCategory');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all articleCategories');
  const articleCategories = await articleCategoryRepo.getAll();
  return Promise.resolve({
    item: articleCategories,
    count: await articleCategoryRepo.getCount()
  });
}

const create = async ({
  article_id,
  category_id,
}) => {
  const newArticleCategory = await articleCategoryRepo.create({
    article_id,
    category_id,
  });
  return newArticleCategory;
}

const update = async (id, {
  article_id,
  category_id,
}) => {
  debugLog(`Updating transaction with id ${id}`, {
    article_id,
    category_id,
  });
  const updatedArticleCategory = await articleCategoryRepo.update(id, {
    article_id,
    category_id,
  });
  return updatedArticleCategory;
}

const deleteId = async (article_id, category_id) => {
  debugLog(`Deleting with id ${article_id, category_id}`);
  const deletedArticleCategory = await articleCategoryRepo.deleteId(article_id, category_id);
  return deletedArticleCategory;
}

module.exports = {
  getAll,
  create,
  update,
  deleteId,
};