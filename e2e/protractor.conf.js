// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

protractorBaseConfig = require('./protractor.base.conf');
const config = protractorBaseConfig.config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox', '--disable-gpu']
  }
};

exports.config = config;
