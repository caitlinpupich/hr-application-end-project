import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    //Collect the data from the form and store it in state 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [experience, setExperience] = useState("")
    const [department, setDepartment] = useState("")

    //Defining useNavigate as navigate so it can be used to redirect after succesfully creating a new employee profiles.
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //Consolidate all the form data into a JSON object. Data pulled from the state variables.
        const newEmployee = {
            firstName,
            lastName,
            username,
            password,
            experience: parseInt(experience, 10), // Convert experience to an integer
            department
        }
        
        // Asynchronous request to send employee data to local JSON server. This server must be initiated in the terminal using the employee.json file in order to work.
        try {
            const response = await fetch ('http://localhost:3000/employees',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                //Convert JS object in JSON string so it can be sent to the server
                body: JSON.stringify(newEmployee)
                })

                //Check for status
                if (!response.ok){
                    throw new Error (`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log("New employee profile created: ", newEmployee)
                alert("Profile created successfully! Redirecting to the login page to sign in.")
                navigate("/")
            }

            catch (error) {
                console.error("Error creating profile:', error.message")
                alert ("Failed to create profile. Please check the console or reach out for support. Error for refference: ${error.message}")
            }
        }
    


    return(
    //Full page container to control the spacing of the form using flexbox
    <div class = "min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-sm">
            <div class="text-center mb-6">
                <h1 class="text-3xl font-extrabold text-gray-900 pb-2">Employee Signup</h1>
                <p class="text-sm text-gray-700">Please create your employee profile with the form below</p>
            </div>
            
            <form class = "bg-white p-8 border border-gray-200 rounded-xl shadow-2xl space-y-6"
            onSubmit={(handleSubmit)}
            >
                    <div class = "space-y-2">
                        <label 
                            htmlFor="username"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            Set Username:
                        </label>
                        <input 
                            onChange = {(e) => setUsername(e.target.value)}
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            class= "border rounded-lg shadow-sm p-1"
                        />
                    </div>

                    <div class= "space-y-2">
                        <label htmlFor="password"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            Set Password:
                        </label>
                        <input 
                            onChange = {(e) => setPassword(e.target.value)}
                            type="text"
                            id="password"
                            name="password"
                            required 
                            class= "border rounded-lg shadow-sm p-1"
                        />
                    </div>

                    <div class= "space-y-2">
                        <label htmlFor="firstName"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            First Name:
                        </label>
                        <input 
                            onChange = {(e) => setFirstName(e.target.value)}
                            type="text"
                            id="firstName"
                            name="firstName"
                            required 
                            class= "border rounded-lg shadow-sm p-1"
                        />
                    </div>

                    <div class= "space-y-2">
                        <label htmlFor="lastName"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            Last Name:
                        </label>
                        <input 
                            onChange = {(e) => setLastName(e.target.value)}
                            type="text"
                            id="lastName"
                            name="lastName"
                            required 
                            class= "border rounded-lg shadow-sm p-1"
                        />
                    </div>


                    <div class= "space-y-2">
                        <label htmlFor="experience"
                            class = "block text-sm md:text-lg font-medium text-gray-700">
                            How many years of experience do you have?
                        </label>
                        <input 
                            onChange = {(e) => setExperience(e.target.value)}
                            type="number"
                            id="experience"
                            name="experience"
                            required 
                            class= "border rounded-lg shadow-sm p-1"
                        />
                    </div>

                <div class= "space-y-2">
                        <label htmlFor="department"
                        class = "block text-sm md:text-lg font-medium text-gray-700">
                            What department do you work in?
                        </label>
                        <select
                        onChange = {(e) => setDepartment(e.target.value)}
                        id="department"
                        name="department"
                        required 
                        class= "border rounded-lg shadow-sm p-1"
                        >
                            <option value="">Select a department</option>
                            <option value="accounting">Accounting</option>
                            <option value="engineering">Engineering</option>
                            <option value="sales">Sales</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>

                <button 
                    type="submit"
                    class="border rounded-lg bg-indigo-600 text-white font-semibold px-4 py-2 w-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Add Profile</button>
            </form>
        </div>
    </div>
    )
}

export default SignUp;