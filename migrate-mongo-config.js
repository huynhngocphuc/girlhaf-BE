require('dotenv/config');

module.exports = {
  mongodb: {
    url: process.env.MONGODB_URI,
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};