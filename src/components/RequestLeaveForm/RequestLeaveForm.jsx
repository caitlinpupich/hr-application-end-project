
import { useState } from "react";

const RequestLeave = () => {

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
    //Set the status for a ticket as open. Set username from Local Storage. These will be static, which is why I am not using useState.
    const status = "open"
    const username = localStorage.getItem("username")

    const handleRequestSubmit = async (e) => {
        e.preventDefault()

        const newRequest = {
            startDate, 
            endDate,
            username,
            status
        }

        try {
            const response = await fetch('http://localhost:3001/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                //Convert JS object in JSON string so it can be sent to the server within the body of the request.
                body: JSON.stringify(newRequest)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log("New request created: ", newRequest, "Please wait for a response from HR.")
            alert(`Request sucesfully created fir the folowing dates. Start Date:, ${startDate}, End Date: ${endDate}. Request is now being reviewed.`)
        } catch (error) {
            console.error("Error creating profile:', error.message")
            alert("Failed to create profile. Please check the console or reach out for support. Error for refference: ${error.message}")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
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
                        className="bg-indigo-700 rounded-lg p-2 font-semibold text-white"
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

export default RequestLeave