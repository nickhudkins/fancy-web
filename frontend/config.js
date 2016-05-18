const path = require('path');

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'UA-XXXXXXX-X',
  apiEndpoint: process.env.API_ENDPOINT || 'http://localhost:3003/graphql',
  assetsPath: path.resolve(__dirname, 'dist'),
  rootDir: path.resolve(__dirname),
};
