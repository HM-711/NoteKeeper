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
    <div className='container'>
        <h1 className="text-center my-3 py-3">Login to begin with NoteKeeper</h1>
          <div className="col-12 col-sm-8 col-md-6 m-auto">
              <div className="card border-0 shadow-lg">
                  <div className="card-body">
                      <form className="lform" onSubmit={handleSubmit}>
                          <div className="text-center my-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                              </svg>
                          </div>
                          <div className="my-2 py-2">
                              <input type="email" className="form-control my-3 py-2" value={creds.email} id="email" name="email" onChange={onChange} placeholder="Email Address" required />
                              <input type="password" className="form-control my-3 py-2" value={creds.password} id="password" name="password" onChange={onChange} placeholder="Password" minLength={8} required />
                          </div>
                          <div className="text-center mt-2">
                              <button type="submit" className="btn btn-primary">Login</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Login