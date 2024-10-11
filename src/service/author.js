const {
  getLogger
} = require('../core/logging');

let {
  authors
} = require('../data/mock-data');

const authorRepo = require('../repository/author');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}


const getAll = async () => {
  debugLog('Fetching all authors');
  const authors = await authorRepo.getAll();
  return Promise.resolve({
    item: authors,
    count: await authorRepo.getCount()
  });
}

const getById = async (id) => {
  debugLog(`Fetching author with id ${id}`);
  return await authorRepo.getById(id);
}

const create = async ({
  firstName,
  lastName,
}) => {
  const newAuthor = await authorRepo.create({
    firstName,
    lastName,
  });
  return newAuthor;
}

const update = async (id, {
  firstName,
  lastName,
}) => {
  debugLog(`Updating author with id ${id}`, {
    firstName,
    lastName,
  });
  const updateAuthor = await authorRepo.update(id, {
    firstName,
    lastName,
  });
  return getById(id);
}

const deleteById = async (id) => {
  debugLog(`Deleting author with id ${id}`);
  return await authorRepo.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};