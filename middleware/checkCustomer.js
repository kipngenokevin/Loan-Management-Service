const soap = require('soap')
const url = "https://kycapitest.credable.io/service/customerWsdl.wsdl"

const checkCustomer = (customerNumber) => {
    soap.createClient(url, (err, client) => {
        if (err) {
            console.error("Error creating SOAP client:", err)
            return
        }

        // Define SOAP parameters
        const args = {
            customerNumber: customerNumber
        }

        // Call the correct method
        client.CustomerPortService.CustomerPortSoap11.Customer(args, (err, result) => {
            if (err) {
                console.error("Error getting customer data", err)
                return
            }

            console.log("Response: ", result)
            return result
        })
    })
}

module.exports = checkCustomer
