const express = require('express')
const { createCustomer, getAllCustomers, getCustomer } = require('../controllers/customercontroller')

const customerRouter = express.Router()

// Public routes
customerRouter.get('/', getAllCustomers)
customerRouter.get('/:id', getCustomer)

// Post Requests 
customerRouter.post('/', createCustomer)

module.exports = customerRouter