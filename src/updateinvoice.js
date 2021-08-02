import { useFormik } from "formik";
import { useState } from "react";
import Updateinvoiceform from "./updateinvoiceform";
export default function Updateinvoice(props){
    let [result,setResult]=useState([]);
    let formik = useFormik({
        initialValues: {
          id:"",
        },
        validate: (values) => {
          let errors = {};
         if (!values.id) {
            errors.id = "Required";
          }
          return errors;
        },
        onSubmit: async (values,{resetForm}) => {
          //console.log("Final Values", values);
          resetForm();
          let check = await fetch("https://invoicetask-backend.herokuapp.com/read/readinvoice", {
            method: "POST",
            body: JSON.stringify({
                id:values.id 
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
          if(check.status===200){
            console.log("success");
            let item = await check.json();
            setResult(item);
          }
         else{
            console.log("something went wrong");
         }
        },
       });
    return <>
    <div className="container">
        <div className="row">
            <div className="col-3">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="id">Invoice ID</label>
                    <input className="form-control" name="id" id="id" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.id}/>
                    {formik.errors.id && formik.touched.id ? (
                            <div> {formik.errors.id}</div>
                            ) : null}

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-12">
                {
                    result.length>0?
                    <Updateinvoiceform data={result[0]} id={props.data._id}/>:null
                }
            </div>
        </div>
    </div>
    </>
}