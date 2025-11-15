import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    //Collect the data from the form and store it in state variables
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [experience, setExperience] = useState("")
    const [department, setDepartment] = useState("")

    //Defining useNavigate as navigate so it can be used to redirect after succesfully creating a new employee profile.s
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //Consolidate all the form data into a JSON object to be stored at a JSON endpoint
        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            experience: experience,
            department: department
        }

        console.log("New employee profile created: ", newEmployee)


        alert("Profile created successfully! Redirecting to the login page to sign in.")
        navigate("/")
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