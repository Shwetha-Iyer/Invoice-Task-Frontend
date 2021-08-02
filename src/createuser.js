import { useFormik } from "formik";
import CustomSelect from './customselect';
import { useHistory } from "react-router-dom";
const options1 = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' } 
  ];
  const options2 =[
    { value: 'employee', label: 'Employee' }
  ]
export default function Createuser(props){
    let history = useHistory();
    let formik = useFormik({
        initialValues: {
          user:"",
          fname:"",
          lname:"",
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
          if (!values.fname) {
            errors.fname = "Required";
          }
          if (!values.lname) {
            errors.lname = "Required";
          }
          if (!values.user) {
            errors.user = "Required";
          }
                    
          return errors;
        },
        onSubmit: async (values,{resetForm}) => {
          //console.log("Final Values", values);
          let email = values.email;
          let fname = values.fname;
          let lname = values.lname;
          let user = values.user;
          console.log(email,fname,lname);
          console.log(user);
          alert("user added!");
          history.push(`/dashboard/${props.data._id}`);
    //       let check = await fetch("", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             firstname:fname,
    //             lastname:lname,
    //             email,
              
    //         }),
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //       });
    //       if(check.status===200){
    //         console.log("success");
    //       }
    //      else{
    //         console.log("something went wrong");
    //      }
        },
       });
    return <>
    <h1> This is Create user tab</h1><br/>
    <form onSubmit={formik.handleSubmit}>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pl-5">
                        <label htmlFor="user">User type</label>
                        {
                            props.data.user_access.title==="admin" ?
                                <CustomSelect
                                    onChange={value=>formik.setFieldValue('user',value.value)}
                                    value={formik.values.user}
                                    options={options1}
                                /> :
                                <CustomSelect
                                    onChange={value=>formik.setFieldValue('user',value.value)}
                                    value={formik.values.user}
                                    options={options2}
                                />
                        }
                        {formik.errors.user ? <div className='error'>{formik.errors.user}</div> : null}
                    </div>
                </div>
                <div className="col-4">
                    <div className="pl-5">
                        <label htmlFor="fname">First name</label>
                        <input type="text" className="form-control select" name="fname" id="fname" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fname}/>
                        {formik.errors.fname && formik.touched.fname ? (
                            <div> {formik.errors.fname}</div>
                            ) : null}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="pl-5 pt-5">
                        <label htmlFor="lname">Last name</label>
                        <input type="text" className="form-control select" name="lname" id="lname" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lname}/>
                        {formik.errors.lname && formik.touched.lname ? (
                            <div> {formik.errors.lname}</div>
                            ) : null}
                    </div>
                </div>
                <div className="col-4">
                    <div className="pl-5 pt-5">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control select" name="email" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.errors.email && formik.touched.email ? (
                            <div> {formik.errors.email}</div>
                            ) : null}
                    </div>
                </div>
            </div>
            <div className="row pt-5 padding">
                <button type="submit" className="btn btn-primary mx-4">Submit</button>
            </div>
        </div>
    </form>
    
    </>
}