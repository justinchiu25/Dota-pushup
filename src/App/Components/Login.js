import react, { useRef } from "react";
import { Nav } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();


    async function handleSubmit(evt) {
      evt.preventDefault();

      try {
        await login(emailRef.current.value, passwordRef.current.value);
        
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
                <h2 className="text-uppercase text-center mb-5">Login to your account</h2>
  
                <form onSubmit={handleSubmit}>

                  <div className="form-outline mb-4">
                    <label className="form-label" >Email</label>
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" ref={emailRef} />
                  </div>
  
                  <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" ref={passwordRef} />
                  </div>
  
                  <div className="d-flex justify-content-center">
                    <button type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                  </div>
  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>)
}