const { Sequelize } = require('sequelize')
require('dotenv').config() // Load environment variables

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false, // Disable query logging
    }
)

module.exports = sequelize