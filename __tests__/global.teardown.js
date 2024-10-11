const {
  shutdownData,
  getKnex,
  tables
} = require('../src/data');

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.article).delete();
  await getKnex()(tables.articleCategory).delete();
  await getKnex()(tables.author).delete();
  await getKnex()(tables.category).delete();

  // Close database connection
  await shutdownData();
};