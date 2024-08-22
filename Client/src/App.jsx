import { useState } from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import Allroutes from './Components/Allroutes'
function App() {
 

  return (
    <>
    <Router>
    <Allroutes/>
    </Router>
    </>
  )
}

export default App
