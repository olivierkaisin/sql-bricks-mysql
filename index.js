'use strict';

const _ = require('lodash');

const reservedWords = require('./lib/reservedWords');
const requireLibrary = require('./lib/requireLibrary');

const sql = requireLibrary();
const Select = sql.select;


// Support proper Date conversion
sql.conversions.Date = function (value) {
  return '"' + value.toISOString().slice(0, 19).replace('T', ' ') + '"';
};

Select.prototype.limit = function (val) {
  this._limit = val;
  return this;
};

Select.prototype.offset = function (val) {
  this._offset = val;
  return this;
};

Select.defineClause(
  'limit',
  '{{#ifNotNull _limit}}LIMIT {{_limit}}{{/ifNotNull}}',
  { after: 'orderBy' }
);

Select.defineClause(
  'offset',
  '{{#ifNotNull _offset}}OFFSET {{_offset}}{{/ifNotNull}}',
  { after: 'limit' }
);


// Add support for reserved words escaping
sql._autoQuoteChar = '`';

for (let word of reservedWords) {
  sql._reserved[word] = word;
}


module.exports = sql;
