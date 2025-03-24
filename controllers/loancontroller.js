const loanStatus = require('../middleware/loanStatus')
const { Loan, Customer } = require('../models')

// Create a new Loan record
exports.createLoan = async (req, res) => {
    try {
        const { customerNumber, loanAmount } = req.body

        // Check if the correct records have been passed
        if (!customerNumber || !loanAmount) {
            return res.status(400).json({ error: "Confirm if you have passed loanAmount or customerAmount" })
        }

        // Get customer
        const customer = Customer.findOne({ where: {customerNumber}})
        const customerId = customer.id
        console.log(customer.id)
        // If true, check the loan status
        const checkLoan = Loan.findOne({ where: {customerId}})

        // If customer has a loan return a failed creating record
        if (loanState) {
            return res.status(400).json({ error: "Customer already has an existing loan"})
        }

        // Initiate a query score - get token
        const status = await loanStatus(customerNumber)
    
        // create a new loan record
        const loan = await Loan.create({
            customerNumber, loanAmount, status
        })

        res.status(201).json({
            message: "Loan request submitted successfully",
            loan: {
                id: loan.id,
                amount: loan.loanAmount,
                customerNumber: loan.customerNumber,
                status: loan.status
            }
        })
    } catch (error) {
        console.error("Error creating loan", error)
        res.status(500).json({ error: "Error submitting customer loan request" })
    }
}

// Return a loan record by Id
exports.getLoan = async (req, res) => {
    try {
        const { id } = req.params

        const loan = await Loan.findByPk(id, {include : ['customer']})

        if (!loan) {
            return res.status(404).json({ error: "Loan record does not exist"})
        }

        res.status(200).json({ loan })
    } catch (error) {
        console.error("Error fetching loan info", error)
        res.status(500).json({ error: "Error fetching loan" })
    }
}

// Update status loan record
exports.updateLoan = (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error updating loan record", error)
        res.status(500).json({ error: "Error updating customer loan status" })
    }
}