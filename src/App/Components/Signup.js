import React, { useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [error,setError] = useState();

    function checkPasswordMatch(password, confirmPassword) {
      return password === confirmPassword;
    }

    async function handleSubmit(evt) {
      evt.preventDefault();
      
      if (!checkPasswordMatch(passwordRef.current.value, passwordConfirmRef.current.value)) {
          return setError("Passwords do not match");
      }

      try {
        setError("");
        await signUp(emailRef.current.value, passwordConfirmRef.current.value);
        navigate("/")
      } catch (err) {
        setError(errorHandler(err));
      }
    }

    return (
    <section className="vh-100 bg-image">
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                {error && <div className="alert alert-primary" role="alert"> {error} </div>}
                <form onSubmit={handleSubmit}>

                  <div className="form-outline mb-4">
                    <label className="form-label" >Email</label>
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" ref={emailRef} />
                  </div>
  
                  <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" ref={passwordRef} />
                  </div>
  
                  <div className="form-outline mb-4">
                    <label className="form-label" >Confirm Password</label>
                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" ref={passwordConfirmRef} />
                  </div>
  
                  <div className="d-flex justify-content-center">
                    <button type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                  </div>
  
                  <p className="text-center text-muted mt-5 mb-0">Have already an account? <Nav.Link as={Link} to="/login" 
                      className="fw-bold text-body"><u>Login here</u></Nav.Link></p>
  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>)
}

function errorHandler(error) {
  let status = error;
  switch (error.code) {
    case "auth/email-already-in-use":
      status = "Email is already in use";
      break;
    case "auth/weak-password":
      status = "Password should be at least 6 characters"
      break;
    case "auth/invalid-email":
      status = "Must be a valid email"
      break;
    default:
      status = "Network Error";
      break;
  }
  return status;
}