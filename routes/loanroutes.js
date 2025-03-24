const express = require('express')
const { createLoan, getLoan } = require('../controllers/loancontroller')

const loanRouter = express.Router()

// Public routes
loanRouter.get('/:id', getLoan)

// Post Requests 
loanRouter.post('/', createLoan)

module.exports = loanRouter