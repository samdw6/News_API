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
  `${tables.author}.id`, 'firstName', 'lastName'
];

const formatAuthor = ({
  id,
  ...rest
}) => ({
  id,
  ...rest
});

const getAll = async () => {
  const authors = await getKnex()(tables.author)
    .select(SELECT_COLUMNS);
  return authors.map(formatAuthor);
}

const getById = async (id) => {
  const author = await getKnex()(tables.author)
    .first(SELECT_COLUMNS)
    .where(`${tables.author}.id`, id);
  return author && formatAuthor(author);
}

const create = async ({
  firstName,
  lastName,
}) => {
  try {
    const [id] = await getKnex()(tables.author).insert({
      firstName,
      lastName,
    });
    return await getById(id);
  } catch (error) {
    debugLog('creation failed', {
      error
    });

    throw new Error('creation failed');
  }
}

const update = async (id, {
  firstName,
  lastName,
}) => {
  debugLog(`Updating author with id ${id}`, {
    firstName,
    lastName,
  });
  const updateAuthor = await getKnex()(tables.author)
    .update({
      firstName,
      lastName,
    })
    .where(`${tables.author}.id`, id);
  return updateAuthor;
}

const deleteById = async (id) => {
  debugLog(`Deleting author with id ${id}`);
  const deleteAuthor = await getKnex()(tables.author)
    .delete()
    .where(`${tables.author}.id`, id);
  return deleteAuthor;
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