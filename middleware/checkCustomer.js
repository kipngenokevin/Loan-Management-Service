const soap = require('soap');
const url = "https://kycapitest.credable.io/service/customerWsdl.wsdl";

const checkCustomer = async (customerNumber) => {
    try {
        return new Promise((resolve, reject) => {
            soap.createClient(url, (err, client) => {
                if (err) {
                    console.error("Error creating SOAP client", err);
                    return reject("Error getting customer data from bank");
                }

                // Define SOAP parameters
                const args = {
                    customerNumber: customerNumber
                };

                // Call the CustomerRequest operation
                client.CustomerRequest(args, (err, result) => {
                    if (err) {
                        console.error("Error getting customer data", err);
                        return reject("Error getting customer data");
                    }

                    console.log("Response: ", result);
                    resolve(result); // Return the result
                });
            });
        });
        
    } catch (error) {
        console.error("Error performing a KYC request", error);
        throw new Error("Failed to check customer");
    }
};

module.exports = checkCustomer;
