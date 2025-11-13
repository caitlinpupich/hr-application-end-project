import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/LoginForm/LoginForm'

function App() {
 
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
