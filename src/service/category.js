const {
  getLogger
} = require('../core/logging');
let {
  categories
} = require('../data/mock-data');
const categoryRepo = require('../repository/category');
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}
const getAll = async () => {
  debugLog('Fetching all categories');
  const categories = await categoryRepo.getAll();
  return Promise.resolve({
    item: categories,
    count: await categoryRepo.getCount()
  });
}

const getById = async (id) => {
  debugLog(`Fetching category with id ${id}`);
  return await categoryRepo.getById(id);
}

const create = async ({
  name,
}) => {
  const newCategory = await categoryRepo.create({
    name,
  });
  return newCategory;
}

const update = async (id, {
  name,
}) => {
  debugLog(`Updating category with id ${id}`, {
    name,
  });
  const updateCategory = await categoryRepo.update(id, {
    name,
  });
  return getById(id);
}

const deleteById = async (id) => {
  debugLog(`Deleting category with id ${id}`);
  return await categoryRepo.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};