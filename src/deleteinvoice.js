import { useFormik } from "formik";
export default function Deleteinvoice(){
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
          let check = await fetch("https://invoicetask-backend.herokuapp.com/delete/deleteinvoice", {
            method: "DELETE",
            body: JSON.stringify({
                id:values.id 
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
          if(check.status===200){
            console.log("success");
            alert("Invoice deleted!");
            resetForm();
          }
         else{
            console.log("something went wrong");
         }
        },
       });
    return <>
        <h1>Delete an invoice</h1>
        <div className="container">
            <div className="row">
                <div className="col-4">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="id">Invoice ID</label>
                    <input className="form-control" id="id" name="id" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.id}/>
                    {formik.errors.id && formik.touched.id ? (<div> {formik.errors.id}</div>) : null}
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
                </div>
            </div>
        </div>
        
    </>
}