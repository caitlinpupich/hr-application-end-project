import EmployeeCard from './EmployeeCard.jsx'

const EmployeeHome = () => {
    return (
        <div class = "min-h-screen flex items-center justify-center p-4">
                <div class="w-full max-w-sm">
                    <div class="text-center mb-6">
                        <h1 class="text-3xl font-extrabold text-gray-900 p-2">Welcome Back</h1>
                        <div>
                            <EmployeeCard />
                        </div>
                    </div>
                </div>
            </div>
            
    )
}

export default EmployeeHome;