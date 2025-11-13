import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/LogIn/LogIn'

function App() {
 
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
