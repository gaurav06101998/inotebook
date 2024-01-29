import React,{useState} from 'react'
import {  useNavigate} from "react-router-dom";
const Signup = (props) => {


  let navigate = useNavigate()
  const [credential,setCredential] = useState({name:"",email:"",password: ""})
      
      const handleClick = async (e) => {
           e.preventDefault()
  
           const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name:credential.name,email: credential.email, password: credential.password})
            });
            const json = await response.json()
            if(json.success){
              localStorage.setItem("token", json.jwtauth)
              navigate("/login")
              props.showAlert('Account Created Successfully','success')
            }
            else{
              props.showAlert('enter a valid credentials','danger')
            }
            
            
          };
  
        
        
        const handleChange = (e) => {
          setCredential({ ...credential, [e.target.name]: e.target.value });
          
        };


  return (
    <div className="col-md-3 container my-5" >
      <form onSubmit={handleClick}>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name='name' value={credential.name} onChange={handleChange}/>
  <label htmlFor="floatingInput">Name</label>
</div>
      <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" name='email' placeholder="name@example.com" value={credential.email} onChange={handleChange} />
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" name='password' placeholder="Password" value={credential.password} onChange={handleChange} minLength={5} />
  <label htmlFor="floatingPassword">Password</label>
</div>
<button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
        </form>
    </div>
  )
}

export default Signup
