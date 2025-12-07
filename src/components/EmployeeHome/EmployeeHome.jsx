import EmployeeCard from './EmployeeCard.jsx'
import RequestLeaveForm from '../RequestLeaveForm/RequestLeaveForm.jsx';

const EmployeeHome = () => {
    return (
        <div class="flex items-center justify-center p-3">
            <div class="w-full max-w-2xl">
                <div className="flex flex-col">
                    <div class="text-center">

                        <h1 class="text-3xl font-extrabold text-gray-900 p-6"> Welcome Back</h1>
                        <div>
                            <EmployeeCard />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 p-3">Request Leave</h1>
                        <div>
                            <RequestLeaveForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EmployeeHome;