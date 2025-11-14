import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState('employee') //This sets the defualt role to emplpoyee
    
    const navigate = useNavigate()

        const handleLogin = (e) => {
            e.preventDefault()

            if (username === "emp" && password === "123" && role === "employee") {
                console.log("Employee login successful for username: ", username, ". Navigating to Employee Home Page...")
                localStorage.setItem("isLoggedIn", "true")
                localStorage.setItem("role", role)
                window.dispatchEvent(new Event("storage"))
                navigate("/employee")
            }

            else if (username === "hr" && password === "123" && role === "hr") {
                console.log("HR login successful for username: ", username, ". Navigating to HR Home Page...")
                localStorage.setItem("isLoggedIn", "true")
                localStorage.setItem("role", role)
                window.dispatchEvent(new Event("storage"))
                navigate("/hr")
            }
            
            else {
             alert("Invalid login. Please try again.")
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
                            dafaultChecked
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