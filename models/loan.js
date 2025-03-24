const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Loan extends Model {}

Loan.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customer_records', // References the table name
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    loanAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,  // Prevent negative loan amounts
            isFloat: { msg: 'loanAmount must be a valid number' }
        }
    },
    loanStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['active', 'closed', 'defaulted']],
                msg: 'loanStatus must be either active, closed, or defaulted'
            }
        }
    }
},{
    sequelize,
    modelName: 'Loan',
    tableName: 'loan_records',
    timestamps: true
})

module.exports = Loan