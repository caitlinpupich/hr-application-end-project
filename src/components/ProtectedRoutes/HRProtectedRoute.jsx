import React from 'react';
import { Navigate } from 'react-router-dom';

function EmployeeProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  // First, check if a user is logged in
  if (!loggedIn) {
    console.log("Not logged in. Redirecting to login page.");
    // Redirect to the root/login page if not logged in
    return <Navigate to= "/unauthorized" replace />;
  }

  //If they are logged in, check if their role is 'hr'
  if (role !== "hr") {
    console.log(`Logged in as role: ${role}. Redirecting due to insufficient privileges.`);
    return <Navigate to= "/unauthorized" replace />; 
  }

  // If both checks pass, render the child components (the protected route)
  return children;
}

export default EmployeeProtectedRoute;