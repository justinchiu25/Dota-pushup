import react, { useRef } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp, currentUser } = useAuth();
    function checkPasswordMatch(password, confirmPassword) {
      return password === confirmPassword;
    }

    async function handelSubmit(evt) {
      evt.preventDefault();
      console.log("Username: ", emailRef.current.value , " Password: ", passwordRef.current.value, " Confirm: ", passwordConfirmRef.current.value);
      
      if (!checkPasswordMatch(passwordRef.current.value, passwordConfirmRef.current.value)) {
          console.log("Set error here");
          return;
      }

      try {
        await signUp(emailRef.current.value, passwordConfirmRef.current.value);
        
      } catch (err) {
        console.log(err);
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
  
                <form onSubmit={handelSubmit}>

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