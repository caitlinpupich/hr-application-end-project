import { useState, useEffect } from "react"


//This component will:
    // 1. Find the current logged in user based on the username stored in localStorage.
    // 2. Pull that user's information from the employee database on the server.
    // 3. Display that information in a card format.

//---FIND CURRENT USER FROM EMPLOYEE DATABASE---//
const EmployeeCard = () => {
    const currentUsername = localStorage.getItem('username')
    const [currentUser, setCurrentUser] = useState("")

    //Use useEffect to pull employee data from server when component mounts.
        // It will use .find the current user based on the username stored in localStorage.
    useEffect(() => {
        const pullEmployeeData = async () => {
            try {
                const response = await fetch('http://localhost:3000/employees')

                if (!response.ok) {
                    throw new Error(`Server error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log("All employee data pulled for Employee Card!: ")
                const currentUser = data.find(employee => employee.username === currentUsername)
                if (currentUser) {
                    console.log("Employee found! Creating user card now")
                    setCurrentUser(currentUser)
                } else {
                    alert("User not found. Please sign up.")
                }
            }
            catch (error) {
                console.error("Error fetching employee list to verify login credentials: ", error.message)
                alert("Server error loading employee information. Please try again later.")
            }
        }
        //Calls function on mount.
        pullEmployeeData()
    }, [])// parameter is empty array to ensure this only runs once when the component mounts.    

    //---RENDER EMPLOYEE CARD WITH FETCHED INFORMATION---
    return (
        <div>
            {currentUser ? (
                <div className="bg-white shadow-md rounded-lg p-3">
                    <h2 className="text-xl font-bold text-indigo-500 p-1">Employee Information</h2>
                    <h2 className="text-2xl font-bold mb-4">{currentUser.firstName} {currentUser.lastName}</h2>
                    <p className="text-gray-700 mb-2">Username: {currentUser.username}</p>
                    <p className="text-gray-700 mb-2">Years of Experience: {currentUser.experience}</p>
                    <p className="text-gray-700 mb-2">Department: {currentUser.department}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}

export default EmployeeCard