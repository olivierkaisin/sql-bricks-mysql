'use strict';

const sql = require('sql-bricks');

const Select = sql.select;

sql.conversions.Date = function (value) {
  return '"' + value.toISOString() + '"';
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

module.exports = sql;
