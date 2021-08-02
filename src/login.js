import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
export default function Login(){

    let [logfail, setLogfail]=useState("");
    let history = useHistory();
    let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
     if (!values.email) {
        errors.email = "Required";
      }
      else if(!((values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))&&(values.email.includes(".")))){
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = "Required";
      }
      else if(!(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/))){
        errors.password = "Password must be atleast 8 characters, 1 Uppercase, 1 Lowercase, 1 Number, max 15 characters";
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      //console.log("Final Values", values);
      let email = values.email;
      let password = values.password;
      let check = await fetch("http://localhost:3100/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if(check.status===200){
        let data = await check.json();
       
      
        history.push(`/dashboard/${data._id}`);
        
      }
        else if(check.status===406){
        setLogfail("Account not activatd");
      }
      else if(check.status===403)
      setLogfail("Account is locked");
      else if(check.status===404)
      setLogfail("User does not exist");
     else{
        setLogfail("Wrong Email or Password!");
     }
    },
  });
    return <>
        <div id="login">
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="text-center text-info pt-5">Login</h3>
                            <div className="form-group">
                                <label htmlFor="email" className="text-info">Email:</label><br/>
                                <input type="text" name="email" id="email" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                            <div> {formik.errors.password}</div>
                            ) : null}
                            <div className="form-group">
                                <Link to="/forgot" className="text-muted">Forgot Password</Link> &nbsp; &nbsp; &nbsp; &nbsp; <br/> <br/>
                                
                                {
                                    logfail !=="" ? (<div> {logfail} </div> ) : null
                                }
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Login"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}