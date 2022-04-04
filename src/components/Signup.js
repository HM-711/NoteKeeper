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
    <div className='container'>
      <h1 className="text-center my-3 py-3">Register to begin with NoteKeeper</h1>
      <div className="col-12 col-sm-8 col-md-6 m-auto">
        <div className="card border-0 shadow-lg">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="text-center my-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <input type="text" className="form-control" id="name" value={creds.name} onChange={onChange} name="name" placeholder="Name" />
                </div>
                <div className="col-12 col-md-6">
                  <input type="email" className="form-control" id="email" value={creds.email} onChange={onChange} name="email" placeholder="Email Address" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <input type="password" className="form-control" id="password" value={creds.password} onChange={onChange} name="password" placeholder="Password" minLength={8} required />
                </div>
                <div className="col-12 col-md-6">
                  <input type="password" className="form-control" id="cpassword" value={creds.cpassword} onChange={onChange} name="cpassword" placeholder="Confirm Password" minLength={8} required />
                </div>
              </div>
              <div className="text-center mt-2">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup