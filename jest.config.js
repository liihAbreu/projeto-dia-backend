/** @type {import('jest').Config} */

module.exports = {
  config: {
    verbose: true,
  },
  preset: '@shelf/jest-mongodb',
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
    mongoURLEnvName: 'MONGODB_URI'
  },
};