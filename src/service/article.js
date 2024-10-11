const {
  getLogger
} = require('../core/logging');
let {
  articles
} = require('../data/mock-data');
const articleRepo = require('../repository/article');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = async () => {
  debugLog('Fetching all articles');
  const articles = await articleRepo.getAll();
  return Promise.resolve({
    item: articles,
    count: await articleRepo.getCount()
  });
}

const getById = async (id) => {
  debugLog(`Fetching article with id ${id}`);
  return await articleRepo.getById(id);
}

const create = async ({
  source,
  title,
  description,
  url,
  date,
  author_id
}) => {
  const newArticle = await articleRepo.create({
    source,
    title,
    description,
    url,
    date,
    author_id
  });
  return newArticle;
}
const update = async (id, {

  source,
  title,
  description,
  url,
  date,
}) => {
  debugLog(`Updating transaction with id ${id}`, {
    source,
    title,
    description,
    url,
    date,
  });
  const updateArticle = await articleRepo.update(id, {
    source,
    title,
    description,
    url,
    date,
  });
  return updateArticle;


}
const deleteById = async (id) => {
  debugLog(`Deleting transaction with id ${id}`);
  await articleRepo.deleteById(id);
}



module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
}