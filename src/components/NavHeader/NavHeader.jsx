import { useNavigate } from "react-router-dom"

//This componenet will render the navigation header at the top of each page. It will:
    // 1. Display a Home link that redirects based on login status and role.
    // 2. Display either a Sign Up button (if not logged in) or a Log Out button (if logged in).
const NavHeader = () => {

    const currentUsername = localStorage.getItem('username')
    const loggedIn = localStorage.getItem("isLoggedIn")
    const userRole = localStorage.getItem("role")

    const navigate = useNavigate()

    //---ASSIGN DYNAMIC HOME LINK BASED ON LOGIN STATUS AND ROLE---//:
        // If logged in as employee, redirect to Employee Home Page.
        // If logged in as HR, redirect to HR Home Page.
        // If not logged in, redirect to Login Page.    
    const getHomeLink = (loggedIn, userRole) => {
        if (loggedIn && userRole === "employee") {
            return "http://localhost:5173/employee";
        } else if (loggedIn && userRole === "hr") {
            return "http://localhost:5173/hr";
        } else {
            return "http://localhost:5173/"; // Default home page (login page) if not logged in or role not known.
        }
    };

    //---LOG OUT FUNCTIONALITY---//
        //1.Clear localStorage
        //2.Redirect to login page.
    const logOut = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("role")
        alert("You have been logged out.")
        navigate("/")
    }

    //---DYNAMIC BUTTON TEXT AND ACTION BASED ON LOGIN STATUS---//
        // If logged in, button shows "Log Out" and calls logOut function on click.
        // If not logged in, button shows "Sign Up" and redirects to Sign Up page on click.
    const secondButtonText = loggedIn? "Log Out" : "Sign Up"
    const secondButtonAction = loggedIn? logOut : () => navigate("/signup")

    // Pre-calculate home link to use in JSX
    const homeLink = getHomeLink(loggedIn, userRole)


//---RENDER NAVIGATION HEADER---//
    return (
        <nav className="bg-indigo-900 shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex space-x-4">

                        {/* Home Link with Dynamic Href */}
                        <a
                            href={homeLink}
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium transition duration-150"
                        >
                            Home
                        {/* Log Out/Sign Up button base on isLoggedIn in localStorage */}
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

