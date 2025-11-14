import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm.jsx'
import SignUp from './components/SignUp/SignUp'
import EmployeeHome from './components/EmployeeHome/EmployeeHome.jsx'
import HRHome from './components/HRHome/HRHome.jsx'

function App() {
 
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/employee" element={<EmployeeHome/>} />
        <Route path = "/hr" element={<HRHome/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
