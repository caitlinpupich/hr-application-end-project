import EmployeeCard from './EmployeeCard.jsx'
import RequestLeave from '../RequestLeaveForm/RequestLeaveForm.jsx';

const EmployeeHome = () => {
    return (
        <div class = "min-h-screen flex items-center justify-center p-4">
                <div class="w-full max-w-sm">
                    <div class="text-center">
                        <h1 class="text-3xl font-extrabold text-gray-900 p-2">Welcome Back</h1>
                        <div className="mb-4">
                            <EmployeeCard />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 pb-2">Request Leave</h1>
                        <div>
                           <RequestLeave />
                        </div>
                    </div>
                </div>
            </div>
            
    )
}

export default EmployeeHome;