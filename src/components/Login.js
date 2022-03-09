import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [creds, setcreds] = useState({email:"", password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3100/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: creds.email,password: creds.password})
        });
        const json = await response.json();
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }
  return (
    <div className='container my-2'>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" value={creds.email} id="email" name="email" onChange={onChange} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" value={creds.password} id="password" name="password" onChange={onChange} minLength={8} required/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Login