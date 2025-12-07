
import { useState } from "react";

const RequestLeaveForm = () => {

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
    //Set the status for a ticket as open. Set username from Local Storage. 
        //These will be static, which is why I am not using useState.
    const status = "open"
    const username = localStorage.getItem("username")

    //---FUNCTION TO HANDLE SUBMITTING A NEW LEAVE REQUEST---


    const handleRequestSubmit = async (e) => {
        e.preventDefault()
        //Request object to be sent to the server.
            //startDate and endDate pulled from state variables above.
            //username and status are static variables defined above.
        const newRequest = {
            startDate, 
            endDate,
            username,
            status
        }

        //Send request object to the server using POST method.
        try {
            const response = await fetch('http://localhost:3001/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(newRequest)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log("New request created: ", newRequest)
            alert(`Request sucesfully created for the folowing dates. Start Date: ${startDate}, End Date: ${endDate}. Request is now being reviewed.`)
        } catch (error) {
            console.error("Error creating request:", error.message)
            alert(`Failed to create request. Please check the console or reach out for support: ${error.message}`)
        }
    }

    //Form to request leave. On submit
        //Each input updates its corresponding state variable on change.
        //On submit, calls handleRequestSubmit function.
    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6 flex justify-center flex-col">
                    
                    <p className="text-sm lg:text-base text-gray-700">Please chose requested leave dates and submit for review</p>
                    
                    <form className = "bg-white flex flex-col p-8 border border-gray-200 rounded-xl shadow-2xl space-y-6"
                    onSubmit={(handleRequestSubmit)}
                    >
                        <label
                        htmlFor="startDate"
                        className = "block text-sm lg:text-base font-medium text-gray-700 mb-2"
                        >
                            Select Start Date of Request: 
                        </label>
                        <input
                        onChange = {(e) => setStartDate(e.target.value)}
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="border rounded-lg p-1"
                        required
                        >
                        </input>

                        <label
                        htmlFor="endDate"
                        className = "block text-sm lg:text-base font-medium text-gray-700 mb-2"
                        >
                            Select End Date of Request: 
                        </label>
                        <input
                        onChange = {(e) => setEndDate(e.target.value)}
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="border rounded-lg p-1"
                        required
                        >
                        </input>

                        <button 
                        className="bg-indigo-700 hover:bg-indigo-900 rounded-lg p-2 font-semibold text-white cursor-pointer"
                        type="submit"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RequestLeaveForm