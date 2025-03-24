const { Customer, Loan } = require('../models')

// Create a new Customer
exports.createCustomer = async (req, res) => {
    try {
        const { customerNumber } = req.body

        // Validate Input
        if (!customerNumber) {
            return res.status(400).json({ error: 'customerNumber missing in your request'})
        }

        // Check if customer exists
        const exists = await Customer.findOne( {where: {customerNumber: customerNumber} })

        if (exists) {
            console.log("Customer already exists")
            return res.status(400).json({ error: "Customer already subscribed" })
        }

        // Create a new subscription
        const customer = await Customer.create({ customerNumber })

        res.status(201).json({ message: 'Customer subscribed successfully', customer: { id: customer.id, customerNumber: customer.customerNumber } })
        
    } catch (error) {
        console.error("Error creating a adding customer subscription")
        res.status(500).json({error: "Error adding a new customer subscription"})
    }
}

// Read all the Customer Data
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            include: [{
                model: Loan,
                as: 'loans',
            }]
        })

        res.status(200).json({ customers })
    } catch (error) {
        console.error("Error getting customers", error)
        res.status(500).json({ error: "Error fetching subscribed customers" })
    }
}

// Get customer data based on id
exports.getCustomer = async (req, res) => {
    try {
        const { id } = req.params

        const customer = await Customer.findByPk(id, {include: ['loans']})

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' })
        }

        res.status(200).json({ customer })
    } catch (error) {
        console.error("Error getting Customer data", error)
        res.status(500).json({ error: "Error fetching customer data"})
    }
}

