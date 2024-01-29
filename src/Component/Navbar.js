import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  let navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token')
        navigate('/login')
  }
  return (
    
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">INotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {localStorage.getItem('token')&&<Link className="nav-link " aria-current="page" to="/">Home</Link>}
        </li>
        <li className="nav-item">
          {localStorage.getItem('token')&&<Link className="nav-link" to="/about">About</Link>}
        </li>
      </ul>
      {!localStorage.getItem('token') ? <div className="d-flex" role="button">
        <Link className="btn btn-primary mx-1" to={'/login'} type="button">Login</Link>
        <Link className="btn btn-primary mx-1" to={'/signup'} type="button">Signup</Link>
      </div> : <button onClick={handleLogout} className="btn btn-primary">Logout</button> }
    </div>
  </div>
</nav>
    
  )
}

export default Navbar
