import { useState, useEffect } from "react"

const FullEmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([])
    const [loading, setLoading] = useState(true)

    // editingEmp holds the employee object being edited (or null)
    const [editingEmp, setEditingEmp] = useState(null)
    const [saving, setSaving] = useState(false)
    
    const [deletingEmp, setDeletingEmp] = useState()
    const [isDeleting, setIsDeleting] = useState(false)


    useEffect(() => {
        const pullEmployeeData = async () => {
            try {
                const response = await fetch("http://localhost:3000/employees")
                
                if (!response.ok) throw new Error(`Server error! status: ${response.status}`)

                const data = await response.json()
                console.log("Employee list pulled succesfully!")
                setEmployeeList(data)
                
            } catch (error) {
                console.error("Error fetching employee list: ", error.message)
                alert("Server error. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        pullEmployeeData()
    }, [])

    //This will open the modal to edit employees.
    const openEdit = (emp) => {
        // create a shallow copy so edits don't immediately mutate the list object
        setEditingEmp({ ...emp })
    }
    
    const closeEdit = () => setEditingEmp(null)

    const handleFieldChange = (field, value) => {
        setEditingEmp(prev => {
            const updated = { ...prev }
            updated[field] = value
            return updated
        })
    }

    const saveEdit = async () => {
        if (!editingEmp) return
        //Make sure all fields are still filled out.
        if (
            !editingEmp.firstName ||
            !editingEmp.lastName ||
            !editingEmp.username ||
            !editingEmp.experience ||
            !editingEmp.department
        ) {
            alert("All fields must be filled out.");
            // Stop the function execution if validation fails
            return;
        }
            setSaving(true)
            try {
                const id = editingEmp.id
                const response = await fetch(`http://localhost:3000/employees/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    //This is instructing the code to update the JSON object (identified by the ID)
                    body: JSON.stringify(editingEmp),
                })
                if (!response.ok) throw new Error(`Save failed: ${response.status}`)

                //This will automatically pass the current state of the employeeList as the parameter (currentList).
                //This sets the local state without having to fetch from the JSON server again.
                setEmployeeList(currentList => {
                    return currentList.map(e => {
                        if (e.id === editingEmp.id) return editingEmp
                        return e
                    })
                })
                closeEdit()

            } catch (err) {
                console.error("Error saving employee:", err)
                alert("Failed to save. Try again.")
            } finally {
                setSaving(false)
            }
        }

    //This will trigger the deletion confirmation modal to open. emp will be set in the map function.
    const openDeleteConfirm = (emp) => setDeletingEmp(emp)

    const closeDeleteConfirm = () => setDeletingEmp(null)

    const removeEmployee = async () => {
        try {
            const id = deletingEmp.id
            const response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) throw new Error(`Error Deleting Employee: ${response.status}`)

            setEmployeeList(currentList => {
                //returns a new array that includes every employee except the one matching the id of the deleted employee.
                return currentList.filter(e => e.id !== id)
            })

            closeDeleteConfirm()
            
        } catch (err) { 
            console.error("Error deleting employee:" )
        } finally {
            setIsDeleting(false)
        }

    }  
    
        //If the list of employees is not ready, it will show these.
        if (loading) return <p>Loading employee data...</p>
        if (!employeeList.length) return <p>No employees found.</p>

        return (
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employeeList.map((emp) => (
                        <div key={emp.id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-indigo-500 p-1">
                                {emp.firstName} {emp.lastName}
                            </h3>
                            <p className="text-gray-700 mb-2">Username: {emp.username}</p>
                            <p className="text-gray-700 mb-2">Years of Experience: {emp.experience}</p>
                            <p className="text-gray-700 mb-2">Department: {emp.department}</p>
                            <div className="mt-3 flex-col">
                                <button
                                    className="bg-indigo-700 hover:bg-indigo-900 hover:cursor-pointer text-white font-semibold px-4 py-1 rounded-lg mr-2"
                                    onClick={() => openEdit(emp)}
                                >
                                    Edit
                                </button>
                                <button 
                                className="bg-red-700 hover:bg-red-900 hover:cursor-pointer text-white font-semibold px-4 py-1 rounded-lg mr-2"
                                onClick = {() => openDeleteConfirm(emp)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/*This will render an editing modal only when editingEmp has a value*/}
                {editingEmp && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        onClick={closeEdit}
                    >
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
                            //stops from closing modal when clicking on the modal itself.
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

                            <label className="block mb-2">
                                <span className="text-sm text-gray-700">First name</span>
                                <input
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    value={editingEmp.firstName}
                                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                                />
                            </label>

                            <label className="block mb-2">
                                <span className="text-sm text-gray-700">Last name</span>
                                <input
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    value={editingEmp.lastName}
                                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                                />
                            </label>

                            <label className="block mb-2">
                                <span className="text-sm text-gray-700">Username</span>
                                <input
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    value={editingEmp.username}
                                    onChange={(e) => handleFieldChange("username", e.target.value)}
                                />
                            </label>

                            <label className="block mb-2">
                                <span className="text-sm text-gray-700">Experience</span>
                                <input
                                    type="number"
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    value={editingEmp.experience}
                                    onChange={(e) => handleFieldChange("experience", Number(e.target.value))}
                                />
                            </label>

                            <label className="block mb-4">
                                <span className="text-sm text-gray-700">Department</span>
                                <input
                                    className="mt-1 block w-full border rounded px-3 py-2"
                                    value={editingEmp.department}
                                    onChange={(e) => handleFieldChange("department", e.target.value)}
                                />
                            </label>

                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 rounded border hover:cursor-pointer"
                                    onClick={closeEdit}
                                    type="button"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 rounded bg-indigo-700 hover:bg-indigo-900 hover:cursor-pointer text-white"
                                    onClick={saveEdit}
                                    type="button"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            {deletingEmp && (
                <div
                    className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeDeleteConfirm}
                >
                    <div
                    className="bg-white rounded-xl p-8 w-full max-w-sm shaod-2xl border-t-4 border-red-500"
                    onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-gray-700 mb-6">Are you sure you want to permanently remove this employee?</p>
                        <button className="text-xl font-bold text-white bg-red-500 hover:bg-red-900 hover:cursor-pointer rounded-lg m-1 p-1"
                        onClick={removeEmployee}
                        disabled={isDeleting}>
                            Confirm Delete
                        </button>
                        <button onClick={closeDeleteConfirm} className="bg-black hover:bg-gray-700 hover:cursor-pointer rounded-lg p-1 m-1 text-white">
                            Close
                        </button>
                    </div>
                </div>
            )}
            </div>
        )
    }

    export default FullEmployeeList
