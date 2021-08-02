import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
export default function Forgot(){
  let [logfail, setLogfail]=useState("");
    let history = useHistory();
    let formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      }
      else if(!((values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))&&(values.email.includes(".")))){
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: async (values) => {
      //console.log("Final Values", values);
      let email = values.email;
      let check = await fetch("", {
        method: "POST",
        body: JSON.stringify({
          email
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if(check.status===200){
        alert("Password Reset link sent to your email!");
        history.push("/login");
      }
      else if(check.status===404){
        setLogfail("Email does not exist! Please check your email");
      }
      else{
        setLogfail("Something went wrong!");
      }

     
    },
  });
    return <>
        <div>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="text-center text-info pt-5">Forgot Password</h3>
                            <div className="form-group">
                                <label htmlFor="email" className="text-info">Email:</label><br/>
                                <input type="text" name="email" id="email" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
                           
                           {
                                    logfail !=="" ? (<div> {logfail} </div> ) : null
                                }
                            <div className="form-group">
                    
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}