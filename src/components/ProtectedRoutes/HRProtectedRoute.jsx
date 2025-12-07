import React from 'react';
import { Navigate } from 'react-router-dom';

//This component will protect routes that should only be accessible to logged-in HR users. It will:
    // 1. Check if the user is logged in by verifying localStorage.
    // 2. Check if the user's role is 'hr'.
    // 3. If both checks pass, render the HR home page; otherwise, redirect to an unauthorized page.

function EmployeeProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  // 1.heck if a user is logged in
  if (!loggedIn) {
    console.log("Not logged in. Redirecting to login page.");
    // Redirect to the root/login page if not logged in
    return <Navigate to= "/unauthorized" replace />;
  }

  //2.If they are logged in, check if their role is 'hr'
  if (role !== "hr") {
    console.log(`Logged in as role: ${role}. Redirecting due to insufficient privileges.`);
    return <Navigate to= "/unauthorized" replace />; 
  }

  // 3.If both checks pass, render the child components (the protected route; hr page)
  return children;
}

export default EmployeeProtectedRoute;