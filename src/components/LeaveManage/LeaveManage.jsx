import { useState } from "react";
import { useEffect } from "react";

const LeaveManage = () => {
    const [leaveList, setLeaveList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const pullOpenRequests = async () => {
            try {
                const response = await fetch("http://localhost:3001/requests")
                if (!response.ok) throw new Error(`Server error  pulling requests! status: ${response.status}`)

                const data = await response.json()
                console.log("Leave Requests Pulled Succesfully!")
                setLeaveList(data)
            } catch (error) {
                console.error("Error fetching request list ", error.message)
                alert("Server error pulling leave reqeusts. Please try again later to load leave requests.")
            } finally {
                setLoading(false)
            }
        }
        pullOpenRequests()
    }, []) // Empty dependency array to ensure this only runs once when the component mounts.

    //Function to approve leave requests (on button click). This will: 
        // 1. Create a new entry in the approved requests database with status set to closed.
        // 2. Remove the original request from the open requests database.
        // 3. Update the local state to remove the approved request from the displayed list.
    const approveRequest = async (req) => {
        const approvedData = {
            ...req,
            status: "closed"
        }
        try {
            const response = await fetch(`http://localhost:3001/approved`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(approvedData)
            })
            if (!response.ok) throw new Error(`Failed to save approved request: ${response.status}`)

        } catch (err) {
            console.error("Error approving request:", err)
            alert("Failed to approve request. Please try again later.")
            return;
        }

        try {
            const id = req.id
            const response = await fetch(`http://localhost:3001/requests/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) throw new Error(`Failed to delete open request: ${response.status}`)

            setLeaveList(prevList => prevList.filter(item => item.id !== req.id))
        } catch (err) {
            console.error("Error removing open request:", err)
            alert("Error removing closed requests from the open request list in database. Please contact admin:", err)
            return;
        }
        console.log("Request approval succesful")
        alert("Request approval succesful!")
    }


    //Function to decline leave requests (on button click). This will: 
        // 1. Create a new entry in the declined requests section of the database with status set to closed.
        // 2. Remove the original request from the open requests section of the database.
        // 3. Update the local state to remove the declined request from the displayed list.
    const declineRequest = async (req) => {
        const declinedData = {
            ...req,
            status: "closed"
        }
        try {
            const response = await fetch(`http://localhost:3001/declined`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(declinedData)
            })
            if (!response.ok) throw new Error(`Failed to save declined request in database: ${response.status}`)

        } catch (err) {
            console.error("Error declining request:", err)
            alert("Server failed to decline request. Please try again later.")
            return;
        }

        try {
            const id = req.id
            const response = await fetch(`http://localhost:3001/requests/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) throw new Error(`Failed to delete open request: ${response.status}`)

            setLeaveList(prevList => prevList.filter(item => item.id !== req.id))
        } catch (err) {
            console.error("Servor error removing open request:", err)
            alert("Error removing closed requests from the open request list in database:", err)
            return;
        }
        console.log("Request decline succesful")
        alert("Request decline succesful!")
    }

    if (loading) return <p>Loading open requests...</p>
    if (!leaveList.length) return <p>No open requests found.</p>

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveList.map(req => (
                    <div key={req.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="font-semibold text-base lg:text-lg">
                            User Requesting Leave: {req.username}
                        </h3>
                        <h4 className="text-sm lg:text-base">
                            Start Date Requested: {req.startDate}
                        </h4>
                        <h4 className="text-sm lg:text-base">
                            End Date Requested: {req.endDate}
                        </h4>
                        <button className="rounded-lg py-1 px-2 m-1 bg-green-300 hover:bg-green-600 hover:cursor-pointer"
                            //Calling function for approved requests on click of the button.
                            onClick={() => approveRequest(req)}
                        >
                            Approve
                        </button>
                        <button className="rounded-lg py-1 px-2 m-1 bg-red-300 hover:bg-red-600 hover:cursor-pointer"
                           //Calling function for declined requests on click of the button.
                           onClick={() => declineRequest(req)}
                        >
                            Decline
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default LeaveManage