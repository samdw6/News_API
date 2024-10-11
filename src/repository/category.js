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
  `${tables.category}.id`, 'name'
];

const formatCategory = ({
  id,
  ...rest
}) => ({
  id,
  ...rest
});

const getAll = async () => {
  const categories = await getKnex()(tables.category)
    .select(SELECT_COLUMNS);
  return categories.map(formatCategory);
}

const getById = async (id) => {
  const category = await getKnex()(tables.category)
    .first(SELECT_COLUMNS)
    .where(`${tables.category}.id`, id);
  return category && formatCategory(category);
}

const create = async ({
  name,
}) => {
  try {
    const [id] = await getKnex()(tables.category).insert({
      name,
    })
    return await getById(id);
  } catch (error) {
    debugLog('creation failed', {
      error
    });

    throw new Error('creation failed');
  }
}

const update = async (id, {
  name,
}) => {
  debugLog(`Updating category with id ${id}`, {
    name,
  });
  const updateCategory = await getKnex()(tables.category)
    .update({
      name,
    })
    .where(`${tables.category}.id`, id);
  return updateCategory;
}

const deleteById = async (id) => {
  debugLog(`Deleting category with id ${id}`);
  return await getKnex()(tables.category)
    .delete()
    .where(`${tables.category}.id`, id);
}
const getCount = async () => {
  debugLog('Fetching author count');
  const [count] = await getKnex()(tables.author).count();
  return count['count(*)'];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getCount,
};