const soap = require('soap')
const url = "https://kycapitest.credable.io/service/customerWsdl.wsdl"

const checkCustomer = (customerNumber) => {
    soap.createClient(url, (err, client) => {
        if (err) {
            console.error("Error creating SOAP client:", err)
            return
        }

        // Log available operations to ensure you are calling the correct one
        console.log(client.describe());

        // Define SOAP parameters
        const args = {
            customerNumber: customerNumber
        }

        // Check if CustomerRequest or other operation exists and call it
        if (client.CustomerRequest) {
            client.CustomerRequest(args, (err, result) => {
                if (err) {
                    console.error("Error getting customer data", err)
                    return
                }

                console.log("Response: ", result)
                return result
            })
        } else {
            console.error("CustomerRequest method not found in the SOAP service.")
        }
    })
}

module.exports = checkCustomer
