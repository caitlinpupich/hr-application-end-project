import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//This component will render the login form and user authentication for both employees and HR. It will:
// 1. Collect username, password, and role from the user.
// 2. Verify credentials against the employee database for employees or hardcoded credentials for HR.
// 3. Store login status and role in localStorage upon successful login.
// 4. Redirect to the appropriate home page based on role.  


const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState('employee') //This sets the defualt role to emplpoyee
    const [isLoading, setIsLoading] = useState('false')

    const navigate = useNavigate()

    //---HANDLE LOGIN SUBMISSION FUNCTION---//
    const handleLogin = async (e) => {
        e.preventDefault()
        //If user selects EMPLOYEE ROLE:
            //1. Pull employee data from server.
            //2. Check if username and password match any employee in the database.
            //3. If match found, store login status and role in localStorage and redirect to Employee Home Page.
        if (role === "employee") {
            const pullEmployeeData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/employees')

                    if (!response.ok) {
                        throw new Error(`Server error! status: ${response.status}`)
                    }

                    const data = await response.json()
                    console.log("All employee data pulled from server succesfully!: ", data)
                    const employee = data.find(employee => employee.username === username && employee.password === password)
                    if (employee) {
                        console.log("Employee login successful for username: ", username, ". Navigating to Employee Home Page...")
                        localStorage.setItem("isLoggedIn", "true")
                        localStorage.setItem("role", role)
                        localStorage.setItem("username", username)
                        navigate("/employee")
                    } else {
                        alert("Invalid login. Please try again.")
                    }
                }

                catch (error) {
                    console.error("Error fetching employee list to verify login credentials: ", error.message)
                    alert("Error fetching server information to verify login. Please try again later.")
                }
            }
            pullEmployeeData()
        }

        //If user selects HR ROLE:
            //1. Check if username and password match hardcoded HR credentials.
            //2. If match found, store login status and role in localStorage and redirect to HR Home Page.
        else if (username == "HRAdmin" && password === "UniversalHRPass123" && role === "hr") {
            console.log("Successful HR Login. Redirecting to HR Home Page")
            navigate("/hr")
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("role", role)
            localStorage.setItem("username", username)
        }

        //If neither role's login is successful, show invalid login alert.
        else {
            alert("Invalid Login. Please try again or sign up.")
        }

    }

//---RENDER LOGIN FORM---//
    //Form to collect username, password, and role from user.
    //On submit, calls handleLogin function.
    //Each input updates its corresponding state variable on change.
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
                </div>

                <form className="bg-white p-8 border border-gray-200 rounded-xl sahdo-2xl space-y-6 "
                    onSubmit={handleLogin}
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="username"
                            className="block text-sm md:text-lg font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="border rounded-lg shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password"
                            className="block text-sm md:text-lg font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="border rounded-lg shadow-sm "
                        />
                    </div>

                    <fieldset className="pt-4">
                        <legend className="text-sm md:text-lg font-medium text-gray-700">Select Role:</legend>
                        <div className="flex items-center">
                            <input
                                checked={role === "employee"}
                                onChange={(e) => setRole(e.target.value)}
                                type="radio"
                                id="employee"
                                name="role"
                                value="employee"
                                required
                                className="h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="employee" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Employee
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                checked={role === "hr"}
                                onChange={(e) => setRole(e.target.value)}
                                type="radio"
                                id="hr"
                                name="role"
                                value="hr"
                                className="h-4 w-4 border-gray-300"
                            />
                            <label htmlFor="hr" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                HR
                            </label>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        className="border rounded-lg bg-indigo-800 font-semibold text-white px-4 py-2 w-full hover:bg-indigo-700 cursor-pointer"
                    >Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;