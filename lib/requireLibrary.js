'use strict';

module.exports = function () {
  clearCache();
  const sql = require('sql-bricks'); 
  clearCache();

  return sql;
};

function clearCache() {
  delete require.cache[ require.resolve('sql-bricks') ];
}
