
/**
 * Fetches all employee data from the JSON server.
 * Returns a promise that resolves to an array of employee objects
 * or undefined if an error occurs.
 */

const FetchEmployees = async() => {
    //This function will fetch the employee data from the JSON server and return an array of all employee objects in the database.
                    try {
                        const response = await fetch('http://localhost:3000/employees')
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`)
                        }

                        const data = await response.json()
                        //NEED TO REMOVE ON FINAL VERSION! This is just to verify that the data is being pulled from the server correctly while building and testing.
                        console.log("All employee data pulled from server succesfully!: ", data)
                        return data
                    }

                    catch (error) {
                        console.error("Error fetching employee list to verify login credentials: ", error.message)
                    }
                    
                    await pullEmployeeData()
                }

                

export default FetchEmployees