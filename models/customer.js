const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Customer extends Model { }

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    customerNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Customer',
    tableName: 'customer_records',
    timestamps: true
})

module.exports = Customer