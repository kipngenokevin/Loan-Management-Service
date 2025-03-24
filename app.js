const express = require('express')
const cors = require('cors')
const path = require('path')
const { sequelize } = require('./models')

// Initialize app as an instance of Express
const app = express()

app.use(express.json()) // Parse incoming json
app.use(cors()) // Enable CORS for all origins

// Test Database Connection & Sync
sequelize.authenticate().then(() => {
    console.log("Connection to PostgreSQL established successfully")

    // Sync the database
    sequelize.sync({ force: false}).then(() => {
        console.log("Database & tables synchronized successfully")
    }).catch((err) => {
        console.error('Error syncing tables', err)
    })
}).catch((err) => {
    console.error('Unable to connect to the database', err)
})

app.get("/", (req, res) => {
    res.status(200).json({"success": "Congratulations on setting your app!"})
})

const PORT = process.env.PORT || 3009
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})