import { useFormik } from "formik";
import React, { useState } from "react";
export default function Createinvoice(props){
    let [form, setForm] = useState([]);
    let [status,setStatus] = useState(-1);
    const prevIsValid = () => {
        if (form.length === 0) {
          return true;
        }
    
        let someEmpty = form.some(
          (item) => item.description === "" || item.quantity === "" ||item.rates==="" ||item.amnt===""
        );
  
        if (someEmpty) {
          form.map((item, index) => {
            const allPrev = [...form];
    
            if (form[index].description === "") {
              allPrev[index].errors.description = "Description is required";
            }
    
            if (form[index].quantity === "") {
              allPrev[index].errors.quantity = "Quantity is required";
            }

            if (form[index].rates === "") {
                allPrev[index].errors.rates = "Rate is required";
              }
              
            setForm(allPrev);
            return "";
          });
        }
    
        return !someEmpty;
      };
    
    const handleAddLink = (e) => {
        e.preventDefault();
        const inputState = {
          description: "",
          quantity: "",
          rates:0,
          amnt:0,
    
          errors: {
            description: null,
            quantity: null,
            rates:null,
            amnt:null
          },
        };
    
        if (prevIsValid()) {
          setForm((prev) => [...prev, inputState]);
        }
      };

      const onValueChange = (index, event) => {
        event.preventDefault();
        event.persist();
    
        setForm((prev) => {
          return prev.map((item, i) => {
            if (i !== index) {
              return item;
            }
    
            return {
              ...item,
              [event.target.name]: event.target.value,
    
              errors: {
                ...item.errors,
                [event.target.name]:
                  event.target.value.length > 0 
                    ? setStatus(-1)
                    : [event.target.name] + " Is required",
              },
            };
          });
        });
      };
      const handleRemoveField = (e, index) => {
        e.preventDefault();
    
        setForm((prev) => prev.filter((item) => item !== prev[index]));
      };
    let formik = useFormik({
        initialValues: {
          invno:"",invdate:"",duedate:"",bcompany: "",ccompany:"",bname:"",cemail:"",baddl1:"",caddl1:"",baddl2:"",
          caddl2:"",bcity:"", ccity:"",bstate:"",cstate:"",bcountry:"", ccountry:"", notes:"", terms:"",desc:"",qty:0,
          rate:0,amount:0,subtot:0,taxp:0,taxa:0,total:0
        },
        validate: (values) => {
          let errors = {};
          if (!values.invno) {
            errors.invno = "Required";
          }
          if (!values.invdate) {
            errors.invdate = "Required";
          }
          if (!values.duedate) {
            errors.duedate = "Required";
          }
          if (!values.bcompany) {
            errors.bcompany = "Required";
          }
          if (!values.ccompany) {
            errors.ccompany = "Required";
          }
          if (!values.bname) {
            errors.bname = "Required";
          }
         if (!values.cemail) {
            errors.cemail = "Required";
          }
          else if(!((values.cemail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))&&(values.cemail.includes(".")))){
            errors.cemail = 'Invalid email address';
          }
          if (!values.baddl1) {
            errors.baddl1 = "Required";
          }
          if (!values.baddl2) {
            errors.baddl2 = "Required";
          }
          if (!values.caddl1) {
            errors.caddl1 = "Required";
          }
          if (!values.caddl2) {
            errors.caddl2 = "Required";
          }
          if (!values.bcity) {
            errors.bcity = "Required";
          }
          if (!values.ccity) {
            errors.ccity = "Required";
          }
          if (!values.bstate) {
            errors.bstate = "Required";
          }
          if (!values.cstate) {
            errors.cstate = "Required";
          }
          if (!values.bcountry) {
            errors.bcountry = "Required";
          }
          if (!values.ccountry) {
            errors.ccountry = "Required";
          }
          if (!values.notes) {
            errors.notes = "Required";
          }
          if (!values.terms) {
            errors.terms = "Required";
          }
          if (!values.desc) {
            errors.desc = "Required";
          }
          if (!values.qty) {
            errors.qty = "Required";
          }
          if (!values.rate) {
            errors.rate = "Required";
          }
          if (!values.taxp) {
            errors.taxp = "Required";
          }
          return errors;
        },
        onSubmit: async (values,{resetForm}) => {
        let someEmpty = form.some(
            (item) => item.description === '' || item.quantity === ''|| item.rates === ''
          );
          
          if(someEmpty){
              setStatus(0);
          }
          else{
             
             
            let billdata= form.map((item)=>{
                delete item["errors"]
                return {
                  item_desc:item.description,
                  qty:item.quantity,
                  rate:item.rates,
                  amount:item.amnt
                }
            });
            
            let billdetails = [
                    {
                      item_desc:values.desc,
                      qty:values.qty,
                      rate:values.rate,
                      amount:values.amount
                    },...billdata
                  ];
            
          
          let final_data = {
              invoice_number:values.invno,
              created_date:values.invdate,
              due_date:values.duedate,
              biller_details:{
                company_name:values.bcompany,
                biller_name:values.bname,
                address_line1:values.baddl1,
                address_line2:values.baddl2,
                city:values.bcity,
                state:values.bstate,
                country:values.bcountry
              },
              client_details:{
                company_name:values.ccompany,
                email:values.cemail,
                address_line1:values.caddl1,
                address_line2:values.caddl2,
                city:values.ccity,
                state:values.cstate,
                country:values.ccountry
              },
              bill_details:{
                items:[...billdetails],
                sub_total:values.subtot,
                tax_percent:values.taxp,
                tax_amount:values.taxa,
                total:values.total
              },
              notes:values.notes,
              terms:values.terms,
              created_by:props.data.email
          }

          let check = await fetch("https://invoicetask-backend.herokuapp.com/create/invoice", {
            method: "POST",
            body: JSON.stringify(final_data),
            headers: {
              "Content-type": "application/json",
            },
          });
          if(check.status===200){
            alert("Invoice is created successfully!");
            form.length=0;
            resetForm();
          }
         else{
            alert("something went wrong");
         }
        }
        }
       });
    return <>
    <h1> Create a new Invoice </h1>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <form onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 pt-2">
                                <input type="text" className="form-control select" placeholder="Invoice Number" name="invno" id="invno" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.invno}/>
                            {formik.errors.invno && formik.touched.invno ? (
                            <div> {formik.errors.invno}</div>
                            ) : null}
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="invoicedate">Invoice date</label>
                                <input type="date" className="form-control select mb-3" name="invdate" id="invdate" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.invdate}/>
                                {formik.errors.invdate && formik.touched.invdate ? (
                            <div> {formik.errors.invdate}</div>
                            ) : null}
                                <label htmlFor="duedate">Due date</label>
                                <input type="date" className="form-control select" name="duedate" id="duedate" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.duedate}/>
                                {formik.errors.duedate && formik.touched.duedate ? (<div> {formik.errors.duedate}</div>) : null}
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-md-6">
                                <h3>Biller Details</h3>
                                <input type="text" className="form-control details mb-3" placeholder="Company Name" name="bcompany" id="bcompany" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bcompany}/>
                                {formik.errors.bcompany && formik.touched.bcompany ? (<div> {formik.errors.bcompany}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Biller Name" name="bname" id="bname" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bname}/>
                                {formik.errors.bname && formik.touched.bname ? (<div> {formik.errors.bname}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Address Line1" name="baddl1" id="baddl1" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.baddl1}/>
                                {formik.errors.baddl1 && formik.touched.baddl1 ? (<div> {formik.errors.baddl1}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Address Line2" name="baddl2" id="baddl2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.baddl2}/>
                                {formik.errors.baddl2 && formik.touched.baddl2 ? (<div> {formik.errors.baddl2}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="City" name="bcity" id="bcity" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bcity}/>
                                {formik.errors.bcity && formik.touched.bcity ? (<div> {formik.errors.bcity}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="State" name="bstate" id="bstate" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bstate}/>
                                {formik.errors.bstate && formik.touched.bstate ? (<div> {formik.errors.bstate}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Country" name="bcountry" id="bcountry" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bcountry}/>
                                {formik.errors.bcountry && formik.touched.bcountry ? (<div> {formik.errors.bcountry}</div>) : null}
                            </div>
                            <div className="col-md-6">
                            <h3>Client Details</h3>
                            <input type="text" className="form-control details mb-3" placeholder="Company Name" name="ccompany" id="ccompany" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ccompany}/>
                            {formik.errors.ccompany && formik.touched.ccompany ? (<div> {formik.errors.ccompany}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Email" name="cemail" id="cemail" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.cemail}/>
                                {formik.errors.cemail && formik.touched.cemail ? (<div> {formik.errors.cemail}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Address Line1" name="caddl1" id="caddl1" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.caddl1}/>
                                {formik.errors.caddl1 && formik.touched.caddl1 ? (<div> {formik.errors.caddl1}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Address Line2" name="caddl2" id="caddl2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.caddl2}/>
                                {formik.errors.caddl2 && formik.touched.caddl2 ? (<div> {formik.errors.caddl2}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="City" name="ccity" id="ccity" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ccity}/>
                                {formik.errors.ccity && formik.touched.ccity ? (<div> {formik.errors.ccity}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="State" name="cstate" id="cstate" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.cstate}/>
                                {formik.errors.cstate && formik.touched.cstate ? (<div> {formik.errors.cstate}</div>) : null}
                                <input type="text" className="form-control details mb-3" placeholder="Country" name="ccountry" id="ccountry" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ccountry}/>
                                {formik.errors.ccountry && formik.touched.ccountry ? (<div> {formik.errors.ccountry}</div>) : null}
                            </div>
                        </div>
                        <h3>Bill Details</h3>
                        <div className="row pt-4">
                            <div className="col-md-5">
                                <h5>Description</h5>
                                <input type="text" className="form-control mb-3" placeholder="Item description" name="desc" id="desc" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.desc}/>
                                {formik.errors.desc && formik.touched.desc ? (<div> {formik.errors.desc}</div>) : null}
                            </div>
                            <div className="col-md-2">
                                <h5> Qty</h5>
                                <input type="number" className="form-control details mb-3" placeholder="Qty" name="qty" id="qty" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.qty}/>
                                {formik.errors.qty && formik.touched.qty ? (<div> {formik.errors.qty}</div>) : null}
                            </div>
                            <div className="col-md-2">
                                <h5>Rate</h5>
                                <input type="number" className="form-control details mb-3" placeholder="Rate" name="rate" id="rate" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rate}/>
                                {formik.errors.rate && formik.touched.rate ? (<div> {formik.errors.rate}</div>) : null}
                            </div>
                            <div className="col-md-2">
                                <h5>Amount</h5>
                                <input type="number" className="form-control details mb-3" placeholder="Amount" name="amount" id="amount" onBlur={formik.handleBlur} value={formik.values.amount=formik.values.qty*formik.values.rate} readOnly={true}/>
                            </div>
                        </div>
                         {
                            form.map((item, index) => (
                                <div className="row pt-4" key={`item-${index}`}>
                                  <div className="col-md-5">
                                    <input type="text"
                                      className={item.errors.description? "form-control is-invalid": "form-control"} name="description" placeholder="Item description"
                                      value={item.description} onChange={(e) => onValueChange(index, e)}/>
                      
                                    {item.errors.description && (
                                      <div className="invalid-feedback">{item.errors.description}</div>
                                    )}
                                  </div>
                      
                                  <div className="col-md-2">
                                    <input type="number" className={item.errors.quantity? "form-control details is-invalid": "form-control details"}
                                      name="quantity" placeholder="qty" value={item.quantity} onChange={(e) => onValueChange(index, e)}
                                    />
                                    {item.errors.quantity && (
                                      <div className="invalid-feedback">{item.errors.quantity}</div>
                                    )}
                                  </div>
                                  <div className="col-md-2">
                                    <input type="number" className={item.errors.rates? "form-control details is-invalid": "form-control details"}
                                      name="rates" placeholder="rates" value={item.rates} onChange={(e) => onValueChange(index, e)}
                                    />
                                    {item.errors.rates && (
                                      <div className="invalid-feedback">{item.errors.rates}</div>
                                    )}
                                  </div>
                                  <div className="col-md-2">
                                    <input type="number" className={item.errors.amnt? "form-control details is-invalid": "form-control details"}
                                      name="amnt" placeholder="amnt" value={item.amnt=item.rates*item.quantity} readOnly={true}
                                    />
                                  </div>
                                <div className="col-md-1">
                                  <button className="btn btn-danger" onClick={(e) => handleRemoveField(e, index)}>
                                    X
                                  </button>
                                  </div>
                                </div>
                              ))

                                    }

                        <div className="row pt-4">
                            <div className="col-5">
                            <button className="btn btn-dark" onClick={handleAddLink}><h5>  +  </h5></button>
                            </div>
                            <div className="col-5">
                            {status === -1 ? null : status === 0 ? (
                            <div>Please fill all the bill details</div>
                            ) : (
                            console.log('success')
                            )}
                            </div>
                        </div>

                        <div className="row pt-4">
                            <div className="col-md-4"></div>
                            <div className="col-md-4"><span className="align-right right mb-3">Sub Total</span></div>
                
                            <div className="col-md-4">
                                
                            <input type="number" className="form-control details mb-3" name="subtot" id="subtot" readOnly={true} value={formik.values.subtot=(form.length>0?form.reduce((a,b)=> a+b.amnt,formik.values.amount):formik.values.amount)}/>
                            
                                
                        </div>  
                        </div>
                        <div className="row pt-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"><span className="align-right right mb-3">Tax Percent</span></div>
                        <div className="col-md-4">
                            <input type="number" className="form-control details mb-3" name="taxp" id="taxp" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.taxp}/> 
                            {formik.errors.taxp && formik.touched.taxp ? (<div> {formik.errors.taxp}</div>) : null}
                        </div>
                        </div> 
                            
                        <div className="row pt-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"><span className="align-right right mb-3">Tax Amount</span></div>
                        <div className="col-md-4">
                        <input type="number" className="form-control details mb-3" value={formik.values.taxa=(formik.values.subtot*formik.values.taxp)/100} readOnly={true}/>
                        </div>
                        </div>
                        <div className="row pt-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"><span className="align-right right mb-3">Grand Total</span></div>
                        <div className="col-md-4">
                        <input type="number" className="form-control details mb-3" value={formik.values.total=formik.values.subtot+formik.values.taxa} readOnly={true}/>
                            </div>
                        </div>
                            
                            </div>
                        
                        <div className="row pt-4">
                            <div className="col-md-6">
                            <input type="text" className="form-control mb-3" placeholder="Notes..." name="notes" id="notes" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.notes}/>
                            {formik.errors.notes && formik.touched.notes ? (<div> {formik.errors.notes}</div>) : null}
                            <input type="text" className="form-control mb-3" placeholder="Terms" name="terms" id="terms" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.terms}/>
                            {formik.errors.terms && formik.touched.terms ? (<div> {formik.errors.terms}</div>) : null}
                            </div>

                        </div>
                        <div className="row pt-4 pl-4">
                            <button type="submit" className="btn btn-primary">Submit</button> &nbsp;&nbsp;&nbsp;&nbsp; 
                            <button type="reset" className="btn btn-warning">Clear</button>
                        </div>
                    
                    
                    


                </form>
            </div>
        </div>
    </div>
    </>
}