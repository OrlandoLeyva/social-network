const store = require('../../../store/dummy');
const ctrl = require('./users.controller');

module.exports = ctrl(store);