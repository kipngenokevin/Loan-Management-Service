const url = ""

const loanStatus = async(customerNumber) => {
    // Get token
    // Try to credit score 3 times
    // Return the status based on the loan amont
    const url = `https://scoringtest.credable.io/api/v1/scoring/initiateQueryScore/${customerNumber}`
    try {
        // for testing return approved
        return 'approved'
    } catch (error) {
        console.error("Error fetching loan status", error)
        return 'failed'
    }
}

module.exports = loanStatus