import React from 'react';
import { Navigate } from 'react-router-dom';

function EmployeeProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  //Check if the user is logged in
  if (!loggedIn) {
    console.log("Not logged in. Redirecting.");
    return <Navigate to= "/unauthorized" replace />;
  }

  // If they are logged in, check if their role is 'employee'
  if (role !== "employee") {
    console.log(`Logged in as role: ${role}. Redirecting due to insufficient privileges.`);
    // Redirect to an unauthorized page, or their own home page
    return <Navigate to= "/unauthorized" replace />; 
  }

  // If both checks pass, render the child components (the protected route)
  return children;
}

export default EmployeeProtectedRoute;