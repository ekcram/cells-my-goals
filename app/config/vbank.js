const appConfig = require('./dev.js');

/**
 * Configuration used in e2e:
 *
 *  cells app:e2e -u <url> -c <config_file>
 *
 * More info in README.md
 */
const vbankConfig = Object.assign({}, appConfig, {
  app_properties: {
    mock: false,
    endpoint: 'http://localhost:7071/resources/movements.json',
  },
});

module.exports = vbankConfig;
