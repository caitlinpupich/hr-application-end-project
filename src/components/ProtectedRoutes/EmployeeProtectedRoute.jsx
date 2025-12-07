import React from 'react';
import { Navigate } from 'react-router-dom';

//This component will protect routes that should only be accessible to logged-in employees. It will:
    // 1. Check if the user is logged in by verifying localStorage.
    // 2. Check if the user's role is 'employee'.
    // 3. If both checks pass, render the employee home page; otherwise, redirect to an unauthorized page.
function EmployeeProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  //1.Check if the user is logged in
  if (!loggedIn) {
    console.log("Not logged in. Redirecting.");
    return <Navigate to= "/unauthorized" replace />;
  }

  // 2.If they are logged in, check if their role is 'employee'
  if (role !== "employee") {
    console.log(`Logged in as role: ${role}. Redirecting due to insufficient privileges.`);
    // Redirect to an unauthorized page, or their own home page
    return <Navigate to= "/unauthorized" replace />; 
  }

  // 3.If both checks pass, render the child components (the protected route)
  return children;
}

export default EmployeeProtectedRoute;