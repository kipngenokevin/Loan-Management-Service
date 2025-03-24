const sequelize = require('../config/config')
const Customer = require('./customer')
const Loan = require('./loan')

require('./associations')

module.exports = { sequelize, Customer, Loan }