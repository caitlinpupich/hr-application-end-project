//This component will display an unauthorized access message when a user tries to access a page they do not have permission to view.
    //It will have its own route in App.jsx.

const Unautorized = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mt-20">Unauthorized Access</h1>
            <p className="text-lg text-gray-700 mt-4">You do not have permission to view this page.</p>
        </div>
    )
}

export default Unautorized;