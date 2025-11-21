import FullEmployeeList from "./FullEmployeeList.jsx";

const HRHome = () => {

    return(
        <div class = "min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-3xl">
            <div class="text-center mb-6">
                <h1 class="text-4xl font-extrabold text-gray-900 p-4">Welcome Back</h1>
                <div className="bg-indigo-100 p-6 rounded-lg shadow-sm">
                    <div className = "w-full text-white bg-gray-800 rounded-lg mb-5">
                        <h2 className="text-2xl font-bold py-3">Employees</h2>
                    </div>
                    <FullEmployeeList />
                </div>
            </div>
        </div>
    </div>
    )
}

export default HRHome;