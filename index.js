#!/usr/bin/env node

/*
    Todo:
      - Handle connection and response errors
      - Handle missing config errors
      - Add Language config
      - Add output config
 */

const request = require('request-promise-native');
const fs = require('mz/fs');
const chalk = require('chalk');

const pkg = require('./package.json');

const requestOptions = {
  url: buildUrl(pkg.nTranslate.platform),
  headers: {
    'X-Application-Id': pkg.nTranslate.appId,
    'X-Rest-Api-Key': pkg.nTranslate.apiKey
  }
};

function buildUrl(platform) {
  return [
    'https://nstack.io/api',
    'v1',
    'translate',
    platform || 'web',
    'keys'
  ].join('/');
}

console.log(chalk.blue('Requesting all translation keys from nStack'));
request(requestOptions)
  .then(function(res) {
    console.log(chalk.green('All translation keys fetched, writing to file'));
    return fs.writeFile('./src/translate.json', res);
  })
  .then(function(a) {
    console.log(chalk.green('All translation keys written to file'));
  })
  .catch(function(e) {
    console.log('nej!', e);
  });