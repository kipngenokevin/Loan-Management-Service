const express = require('express')
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({"success": "Congratulations on setting your app!"})
})

const PORT = process.env.PORT || 3009
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})