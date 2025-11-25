import { useNavigate } from "react-router-dom"

const NavHeader = () => {

    const currentUsername = localStorage.getItem('username')
    const loggedIn = localStorage.getItem("isLoggedIn")
    const userRole = localStorage.getItem("role")

    const navigate = useNavigate()

    // Fucntion to determine the correct Home link URL
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

    //Store correct link path in homeLink to reference in the return element
    const homeLink = getHomeLink(loggedIn, userRole)

    return (
        <nav className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex space-x-4">

                        {/* Home Link with Dynamic Href */}
                        <a
                            // We use the pre-calculated 'homeLink' variable here
                            href={homeLink}
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-150"
                        >
                            Home
                        </a>

                        {/* Logout Button/Link */}
                        {loggedIn && (
                            <button
                                onClick = {logOut}
                                className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium shadow-lg transition duration-150 ease-in-out"
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );

}

export default NavHeader

