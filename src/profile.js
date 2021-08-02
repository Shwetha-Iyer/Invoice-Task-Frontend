import { useEffect, useState } from "react"
export default function Profile(props){
    let [item,setItem]=useState(0);
    useEffect(()=>{
        async function fetchdata(email){
            //console.log("inside")
            let check = await fetch(`https://invoicetask-backend.herokuapp.com/read/readinvoice`,{
                method:"POST",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    created_by:email
                  }),
            });
            if(check.status!==200)
            setItem("Oops can't load data");
            else{
                
                let result = await check.json();
                //console.log(result);
                setItem(result.length);                
            }   
        }
        fetchdata(props.data.email);
    },[props.data.email]);
    return <>
    <div className="container">
        <div className="row">
            <div className = "col-6">
            <div className="card card-info my-5">
                <h1> Profile Information </h1> <br/>
                <h4> 
                    First Name: {props.data.firstname} <br/>
                    Last Name: {props.data.lastname} <br/>
                    Email: {props.data.email} <br/>
                    Create User access: {
                        props.data.user_access.title === "admin" ? <span> Admin, Manager, Employee </span> : null
                    }
                    {
                        props.data.user_access.title === "manager" ? <span> Employee </span> : null
                    }
                    {
                        props.data.user_access.title === "employee" ? <span> None </span> : null
                    }<br/>
                    Invoice_access :{
                        props.data.invoice_access.create ? <span> Create </span> : null
                    }
                    {
                        props.data.invoice_access.read ? <span> Read </span> : null
                    }
                    {
                        props.data.invoice_access.update ? <span> Update </span> : null
                    }
                    {
                        props.data.invoice_access.delete ? <span> Delete </span> : null
                    } <br/>
                    <br/> <br/> <br/>
                    
                </h4>
                </div>
            </div>
            <div className = "col-6">
                <div className="card my-5 card-count">
                    <div className="card-title">
                        <h1>Invoice created by You</h1>
                    </div>
                    <div className="card my-2 card-circle">
                        <h1> {item} </h1>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
}