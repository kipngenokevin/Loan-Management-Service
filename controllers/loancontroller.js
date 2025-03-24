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

        // Check if customer has an existing loan
        // If true, check the loan status

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