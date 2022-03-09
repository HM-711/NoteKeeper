import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [creds, setcreds] = useState({ name:"", email: "", password: "", cpassword:"" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3100/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password})
    });
    const json = await response.json();
    if (json.success) {
      //save the authtoken and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    }
    else {
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-2'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={creds.name} onChange={onChange} name="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={creds.email} onChange={onChange} name="email"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={creds.password} onChange={onChange} name="password" minLength={8} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" value={creds.cpassword} onChange={onChange} name="cpassword" minLength={8} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup