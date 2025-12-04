import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm.jsx'
import SignUp from './components/SignUp/SignUp'
import EmployeeHome from './components/EmployeeHome/EmployeeHome.jsx'
import HRHome from './components/HRHome/HRHome.jsx'
import NavHeader from './components/NavHeader/NavHeader.jsx'
import HRProtectedRoute from './components/ProtectedRoutes/HRProtectedRoute'
import EmployeeProtectedRoute from './components/ProtectedRoutes/EmployeeProtectedRoute.jsx'
import Unauthorized from './components/Unauthorized/Unauthorized.jsx'

function App() {

  return (
    <>
      <Router>
        <NavHeader />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={
            <EmployeeProtectedRoute>
              <EmployeeHome />
            </EmployeeProtectedRoute>
          } />
          <Route path="/hr" element={
            <HRProtectedRoute>
              <HRHome />
            </HRProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
