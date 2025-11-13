import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm.jsx'
import SignUp from './components/SignUp/SignUp'

function App() {
 
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
