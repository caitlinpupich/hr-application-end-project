import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState('employee') //This sets the defualt role to emplpoyee
    
    const navigate = useNavigate()

        const handleLogin = async (e) => {
            e.preventDefault()

            if (role === "employee") {
                    const pullEmployeeData = async() => {
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
                    }
                }
                pullEmployeeData () 
            }
    

            else if (username == "HRAdmin" && password === "UniversalHRPass123" && role === "hr") {
                console.log("Successful HR Login. Redirecting to HR Home Page")
            }

            else {
                alert("Invalid Login. Please try again or sign up.")
            }  

        }

    
    return(
    <div class = "min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-sm">
            <div class="text-center mb-6">
                <h1 class="text-3xl font-extrabold text-gray-900">Sign In</h1>
            </div>
            
            <form class = "bg-white p-8 border border-gray-200 rounded-xl sahdo-2xl space-y-6 ">
                    <div class = "space-y-2">
                        <label 
                            htmlFor="username"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            Username:
                        </label>
                        <input 
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            class= "border rounded-lg shadow-sm"
                        />
                    </div>

                    <div class= "space-y-2">
                        <label htmlFor="password"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            Password:
                        </label>
                        <input 
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            required 
                            class= "border rounded-lg shadow-sm "
                        />
                    </div>

                <fieldset class="pt-4">
                    <legend class= "text-sm md:text-lg font-medium text-gray-700">Select Role:</legend>
                    <div class="flex items-center">
                        <input
                            checked = {role === "employee"}
                            onChange={(e) => setRole(e.target.value)}
                            type = "radio"
                            id = "employee"
                            name = "role"
                            value = "employee"
                            required 
                            class="h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="employee" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                            Employee
                        </label>
                    </div>

                    <div class="flex items-center">
                        <input
                            checked = {role === "hr"}
                            onChange={(e) => setRole(e.target.value)}
                            type = "radio"
                            id = "hr"
                            name = "role"
                            value = "hr"
                            class="h-4 w-4 border-gray-300"
                        />
                        <label htmlFor="hr" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                            HR
                        </label>
                    </div>
                </fieldset>

                <button 
                type="submit"
                class="border rounded-lg bg-indigo-600 text-white px-4 py-2 w-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick = {handleLogin}
                >Log In</button>
            </form>
        </div>
    </div>
    )
}

export default LoginForm;