import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container p-5 rounded">  
      <h2 className="text-center"><b>Log In</b></h2>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label pt-3">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div id="Forgot" className="form-text mb-3 text-end"><a href="#">Forgot Password</a></div>
        <div className="d-grid gap-2 pb-3">
          <button className="btn btn-primary" type="button">Button</button>
        </div>
      </form>

      <div id="Forgot" className="form-text my-4 text-center">Don't have an account? <a href="#">Sign Up</a></div>
    </div>
  )
}

export default App
