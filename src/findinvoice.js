import { useFormik } from "formik";
import { useState } from "react";
import CustomSelect from './customselect';
import Viewinvoice from "./viewinvoice";
const options1 = [
    { value: 'all', label: 'All' },
    { value: 'created', label: 'Created By' },
    { value: 'invoice', label: 'Invoice ID' } 
  ];
export default function Findinvoice(props){
    
    let [view,setView]=useState({})
    let [data, setData] = useState([]);
    let displayInvoice = (item)=>{
        setView(item);
    }
    let formik = useFormik({
        initialValues: {
          type:"",
          created:"",
          id:"",
        },
        validate: (values) => {
          let errors = {};
         if (!values.type || values.type==="select") {
            errors.type = "Required";
          }
          if (!values.created &&values.type==="created") {
            errors.created = "Required";
          }
          if (!values.id &&values.type==="invoice") {
            errors.id = "Required";
          }    
          return errors;
        },
        onSubmit:  async(values,{resetForm}) => {

          let final={};
          if(values.type==="all"){
              //console.log("call url",values.type);
              ;
          }
          else if(values.type==="created"){
              final={created_by:values.created};
          }
          else{
            final={id:values.id}
          }
          values.type=null;
          resetForm({values:''});
          //console.log(user);
          setData([]);
          let check = await fetch("https://invoicetask-backend.herokuapp.com/read/readinvoice", {
            method: "POST",
            body: JSON.stringify(final),
            headers: {
              "Content-type": "application/json",
            },
          });
          if(check.status===200){
            let result = await check.json();
            setData(result);
          }
         else{
            console.log("something went wrong");
         }
        },
       });
    return <>

        
    
    <h1> Find Invoice here</h1>
    <form onSubmit={formik.handleSubmit}>
    <div className="container">
        <div className="row pt-3">
            <div className="col-md-12">
            <CustomSelect
                onChange={value=>formik.setFieldValue('type',value.value)}
                value={formik.values.type}
                options={options1}
            />
            {formik.errors.type ? <div className='error'>{formik.errors.type}</div> : null}
            </div>
        </div>
        {
            formik.values.type === "created"?
            <>
            <div className="row pt-3">
                <div className="col-md-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="created" id="created" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.created}/>
                    {formik.touched.created&&formik.errors.created?(<div> {formik.errors.created}</div>) : null}
                </div>
            </div>
            </>:
            formik.values.type === "invoice"?
            <>
            <div className="row pt-3">
                <div className="col-md-3">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" name="id" id="id" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.id}/>
                    {formik.touched.id&&formik.errors.id?(<div> {formik.errors.id}</div>) : null}
                </div>
            </div>
            </>: null
        }
        <div className="row pt-3">
            <div className="col-md-2">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
    
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                {
                    data.length>0?
                    <div className="col-12 pt-5">
                        <table className="table pt-3">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Invoice ID</th>
                                    <th>Created By</th>
                                    <th>Client Email</th>
                                    <th>Created Date</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    data.map((item,index)=>{
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item._id}</td>
                                            <td>{item.created_by}</td>
                                            <td>{item.client_details.email}</td>
                                            <td>{item.created_date}</td>
                                            <td><button type="button" className="btn btn-secondary" onClick={()=>displayInvoice(item)}>View Invoice</button></td>
                                        </tr>
                                        
                                    })
                                    
                                }
                            </tbody>
                        </table> 
                    
                        
                    </div>:null
                }
            </div>
        </div>
    </div>
    <div>
        {
            JSON.stringify(view) !== '{}'?
            <Viewinvoice data={view}/>:null
        }
    </div>
    
    </form>
    

    </>
}