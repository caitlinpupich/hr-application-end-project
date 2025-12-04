import { useNavigate } from "react-router-dom"

const NavHeader = () => {

    const currentUsername = localStorage.getItem('username')
    const loggedIn = localStorage.getItem("isLoggedIn")
    const userRole = localStorage.getItem("role")

    const navigate = useNavigate()

    // Function to determine the correct Home link URL
    const getHomeLink = (loggedIn, userRole) => {
        if (loggedIn && userRole === "employee") {
            return "http://localhost:5173/employee";
        } else if (loggedIn && userRole === "hr") {
            return "http://localhost:5173/hr";
        } else {
            return "http://localhost:5173/"; // Default home page (login page) if not logged in or role not known.
        }
    };

    //Funtion to remove localStorage login information when someone clicks logout.
    const logOut = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("role")
        navigate("/")
    }

    
    const secondButtonText = loggedIn? "Log Out" : "Sign Up"
    const secondButtonAction = loggedIn? logOut : () => navigate("/signup")

    const homeLink = getHomeLink(loggedIn, userRole)

    return (
        <nav className="bg-indigo-900 shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex space-x-4">

                        {/* Home Link with Dynamic Href */}
                        <a
                            // Using the pre-calculated 'homeLink' variable here
                            href={homeLink}
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium transition duration-150"
                        >
                            Home
                        </a>
                            <button
                                onClick={secondButtonAction}
                                className="bg-black text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium shadow-lg transition duration-150 ease-in-out cursor-pointer"
                            >
                                {secondButtonText}
                            </button>

                    </div>

                </div>
            </div>
        </nav>
    );

}

export default NavHeader

