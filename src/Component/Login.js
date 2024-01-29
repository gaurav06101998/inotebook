import React,{useState} from "react";
import {  useNavigate} from "react-router-dom";

const Login = (props) => {



    let navigate = useNavigate()
const [credential,setCredential] = useState({email:"",password: ""})
    
    const handleClick = async (e) => {
         e.preventDefault()

         const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password})
          });
          const json = await response.json()
          if(json.success){
            localStorage.setItem("token", json.jwtauth)
            navigate("/")
            props.showAlert('Login Successfully','success')

          }
          else{
            props.showAlert('enter a valid credentials','danger')
          }
          
          
        };

      
      
      const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
        
      };

  return (
    <div className="col-md-3 container my-5">
      <form onSubmit={handleClick}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            onChange={handleChange}
            value={credential.email}
          />
          <label htmlFor="floatingInput">Email address</label>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={credential.password}
            minLength={5}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
