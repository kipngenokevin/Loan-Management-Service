const Customer = require('./customer')
const Loan = require('./loan')

Loan.belongsTo(Customer, {
    foreignKey: 'customerId', // Foreign key used
    as: 'customer' // alias for the association
})

Customer.hasMany(Loan, {
    foreignKey: 'customerId',
    as: 'loans'
})

module.exports = { Customer, Loan}