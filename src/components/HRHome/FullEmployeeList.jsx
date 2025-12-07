import { useState, useEffect } from "react"

//This function will:
    // 1. Fetch and display a list of all employees from the JSON server.
    // 2. Allow HR to edit employee information via a modal form.
    // 3. Allow HR to delete employee profiles with a confirmation modal.
const FullEmployeeList = () => {

//---DECLARING STATE VARIABLES---//
    const [employeeList, setEmployeeList] = useState([])
    const [loading, setLoading] = useState(true)

    // editingEmp holds the employee object being edited (or null)
    //These are meant to manage the editing modal state
    const [editingEmp, setEditingEmp] = useState(null)
    const [saving, setSaving] = useState(false)

    //These are meant to manage the deletion modal state (since there is a modal to confirm deletion)
    const [deletingEmp, setDeletingEmp] = useState()
    const [isDeleting, setIsDeleting] = useState(false)

//---PULLING EMPLOYEE DATA FROM JSON SERVER---//
    //useEffect will trigger the fetch to pull employee data from the JSON server when the component first mounts.
    useEffect(() => {
        const pullEmployeeData = async () => {
            try {
                const response = await fetch("http://localhost:3000/employees")

                if (!response.ok) throw new Error(`Server error fetching the employee list! status: ${response.status}`)

                const data = await response.json()
                console.log("Employee list pulled succesfully!")
                setEmployeeList(data)

            } catch (error) {
                console.error("Error fetching employee list: ", error.message)
                alert("Server error fetching the employee list. Please try again later:", error.message)
            } finally {
                setLoading(false)
            }
        }

        //Call the function. This will assign the fetched data to the employeeList state variable.
        pullEmployeeData()
    }, [])

    //---FUNCTIONS TO HANDLE EDITING AND DELETING EMPLOYEES---//

    //Function to open the edit modal and set the employee being edited.
        //emp will be set in the map function (in the return statement).
    const openEdit = (emp) => {
        setEditingEmp({ ...emp })
    }

    //If the setEditingEmp is set to null, the modal will close. This is how the modal is controlled.
    const closeEdit = () => setEditingEmp(null)

    //This will handle changes to any field in the edit modal form.
    const handleFieldChange = (field, value) => {
        setEditingEmp(prev => {
            //...prev is a shallow copy of the previous state object, which is what you are making edits to.
            const updated = { ...prev }
            updated[field] = value
            return updated
        })
    }

    //FUNCTION FOR SAVING EDITS. It will:
        // 1.Validate that all fields are filled out.
        // 2.Send the updated employee data to the JSON server to save the changes.
        // 3.Update the local state with the edits - without having to fetch from the JSON server again.
    const saveEdit = async () => {
        if (!editingEmp) return
        //1. Ensure all fields are filled out before allowing save.
        if (
            !editingEmp.firstName ||
            !editingEmp.lastName ||
            !editingEmp.username ||
            !editingEmp.experience ||
            !editingEmp.department
        ) {
            alert("All fields must be filled out.");
            // Stop the function execution if validation fails (if they do not have values for every field, do not let them save).
            return;
        }
        
        setSaving(true)
        //2. Editited employee data sent to JSON server to save changes (ID is unique identifier for each employee).
        try {
            const id = editingEmp.id
            const response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingEmp),
            })
            if (!response.ok) throw new Error(`Save failed: ${response.status}`)

            //3. Update local instance.
            setEmployeeList(currentList => {
                return currentList.map(e => {
                    if (e.id === editingEmp.id) return editingEmp
                    return e
                })
            })
            closeEdit()

        } catch (err) {
            console.error("Error saving changes:", err)
            alert("Failed to save changes. Please try again later.")
        } finally {
            setSaving(false)
        }
    }

    //This function will trigger the deletion confirmation modal to open. 
        //emp will be set in the map function in the return section.
    const openDeleteConfirm = (emp) => setDeletingEmp(emp)

    const closeDeleteConfirm = () => setDeletingEmp(null)

    //FUNCTION TO REMOVE EMPLOYEE. This will:
        // 1. Send a DELETE request to the JSON server to remove the employee profile.
        // 2. Update the local state to remove the deleted employee from the displayed list.
    const removeEmployee = async () => {
        //1. Send DELETE request to JSON server.
        try {
            const id = deletingEmp.id
            const response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) throw new Error(`Error Deleting Employee: ${response.status}`)
            //2. Update local state to remove deleted employee from displayed list.
            setEmployeeList(currentList => {
                //returns a new array that includes every employee except the one matching the id of the deleted employee.
                return currentList.filter(e => e.id !== id)
            })

            closeDeleteConfirm()

        } catch (err) {
            console.error("Error deleting employee:")
        } finally {
            setIsDeleting(false)
        }

    }

    //If the list of employees is not loaded yet (or empty), display a message:
    if (loading) return <p>Loading employee data...</p>
    if (!employeeList.length) return <p>No employees found.</p>

    //---RETURNING THE EMPLOYEE LIST WITH EDIT AND DELETE OPTIONS---//

    //This will return a grid of employee cards, each with edit and delete buttons.
        //Edit Button -> onClick will open the edit modal for that employee usinig the openEdit function.
        //Delete Button -> onClick will open the delete confirmation modal for that employee using the openDeleteConfirm function.
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Use .map to create a card for each employee pulled from the database */}
                    {/* Remember that the emp mapped here will be used as the parameter for the edit and delete functions */}
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
                                onClick={() => openDeleteConfirm(emp)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---EDITING MODAL */}
                {/*This will render an editing modal only when editingEmp has a value*/}
            {editingEmp && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    /* If you click outside the modal, cancel edit function + close modal. */
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

            {/* ---DELETION CONFIRMATION MODAL--- */}
                {/*This will render a deletion confirmation modal only when deletingEmp has a value*/}
            {deletingEmp && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    /* If you click outside modal, cancel delete funciton + exit modal. */
                    onClick={closeDeleteConfirm}
                >
                    <div
                        className="bg-white rounded-xl p-8 w-full max-w-sm shaod-2xl border-t-4 border-red-500"
                        /* Do not close modal if you click on the modal itself. */
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
