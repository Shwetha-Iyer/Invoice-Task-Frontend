import { useFormik } from "formik";
import CustomSelect from './customselect';
const options1 = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' } 
  ];
export default function Modifyuseraccess(props){
    let formik = useFormik({
        initialValues: {
          user:"",
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
          if (!values.user) {
            errors.user = "Required";
          }           
          return errors;
        },
        onSubmit: async (values) => {
          //console.log("Final Values", values);
          let email = values.email;
          let user = values.user;
          console.log(email);
          console.log(user);
          let user_access={};
          let invoice_access={};
          if(user==="employee"){
            user_access={
              title:"employee",
              create_admin:false,
              create_manager:false,
              create_employee:false,
              updated_by:props.data.email
            }
            invoice_access={
              create:true,
              read:true,
              update:false,
              delete:false,
              updated_by:props.data.email
            }
        }
        else if(user==="manager"){
          user_access={
            title:"manager",
            create_admin:false,
            create_manager:false,
            create_employee:true,
            updated_by:props.data.email
          }
          invoice_access={
            create:true,
            read:true,
            update:true,
            delete:false,
            updated_by:props.data.email
          }
        }
        else{
          user_access={
            title:"admin",
            create_admin:true,
            create_manager:true,
            create_employee:true,
            updated_by:props.data.email
          }
          invoice_access={
            create:true,
            read:true,
            update:true,
            delete:true,
            updated_by:props.data.email
          }
        }
          let check = await fetch("https://invoicetask-backend.herokuapp.com/update/useraccess", {
            method: "PUT",
            body: JSON.stringify({
                email,
                user_access,
                invoice_access
              
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
          if(check.status===200){
            console.log("success");
          }
         else{
            console.log("something went wrong");
         }
        },
       });
    return <>
        <h1> Modify create role </h1><br/>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                        <form className="pl-4 pt-4 pb-4" onSubmit={formik.handleSubmit}>
                            <label htmlFor="email">Email ID</label>
                            <input type="text" className="form-control select" name="email" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                            {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
                            <div className="pt-4">
                                <label htmlFor="user">Change User to</label>
                                <CustomSelect
                                    onChange={value=>formik.setFieldValue('user',value.value)}
                                    value={formik.values.user}
                                    options={options1}
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </>
}