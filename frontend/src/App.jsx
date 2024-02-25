
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/sendMoney'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import {Routes,BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="sendMoney" element={<SendMoney/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
