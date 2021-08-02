import { useState,useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Createinvoice from "./createinvoice";
import Createuser from "./createuser";
import Findinvoice from "./findinvoice";
import Modifyuseraccess from "./modifyuseraccess";
import Profile from "./profile";
import Updateinvoice from "./updateinvoice";
import { useHistory } from "react-router-dom";
import Deleteinvoice from "./deleteinvoice";

export default function Dashboard(props){
    let history = useHistory();
    let [userdata,setUserdata]=useState([]);
    let [page,setPage]=useState("");
    useEffect(()=>{
        async function fetchdata(id){
            let check = await fetch(`https://invoicetask-backend.herokuapp.com/dash/dashboard/${id}`);
            if(check.status!==200)
            setPage("Oops can't load page");
            else{
                
                let data = await check.json();
                setUserdata([data]);
                setPage("Success");
                //console.log(userdata[0].invoice_access.create);
            }
            
        }
        fetchdata(props.match.params.id);
    },[props.match.params.id]);
    let logout = ()=>{
        history.push("/login");
    }
    return <>
        <Router>
        {
            page ? (page==="Success"?
            <>
            <h1> {(userdata[0].user_access.title).toUpperCase()} Dashboard
                
                <button className="align-right btn btn-warning mt-3 mr-5" type="button" onClick={logout}>Log out</button></h1> <hr/>
                <h1> Welcome {userdata[0].firstname}</h1>
                
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="nav-scroller py-1 mb-2">
                                <nav className="nav justify-content-between">
                                <Link to={`/dashboard/${props.match.params.id}`} className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</Link>
                                {
                                    userdata[0].user_access.title ==="admin"|| userdata[0].user_access.title ==="manager"?
                                    <>
                                        <Link to={`/dashboard/${props.match.params.id}/createuser`} className="nav-link" id="create-user-tab" data-toggle="tab" href="#createuser" role="tab" aria-controls="createuser" aria-selected="false">Create User</Link>

                                    </>: null
                                }
                                {
                                    userdata[0].user_access.title ==="admin" ?
                                    <>
                                    
                                            <Link to={`/dashboard/${props.match.params.id}/deleteinvoice`} className="nav-link" id="delete-invoice-tab" data-toggle="tab" href="#deleteinvoice" role="tab" aria-controls="deleteinvoice" aria-selected="false">Delete an Invoice</Link>
                                   
                                   
                                            <Link to={`/dashboard/${props.match.params.id}/modifyuseraccess`} className="nav-link" id="change-user-access-tab" data-toggle="tab" href="#changeuseraccess" role="tab" aria-controls="changeuseraccess" aria-selected="false">Modify User Role</Link>
                                 
                                    </>
                                    : null
                                }
                                {
                                    (userdata[0].user_access.title ==="manager" && userdata[0].invoice_access.update ===true)||userdata[0].user_access.title ==="admin"?
                                    
                                            <Link to={`/dashboard/${props.match.params.id}/updateinvoice`} className="nav-link" id="update-invoice-tab" data-toggle="tab" href="#updateinvoice" role="tab" aria-controls="updateinvoice" aria-selected="false">Update Invoice</Link>
                                     : null
                                }
                                {
                                    
                                    (userdata[0].user_access.title ==="employee" && userdata[0].invoice_access.create===true)||userdata[0].user_access.title ==="admin"|| userdata[0].user_access.title ==="manager"?
                                    
                                            <Link to={`/dashboard/${props.match.params.id}/createinvoice`} className="nav-link" id="create-invoice-tab" data-toggle="tab" href="#createinvoice" role="tab" aria-controls="createinvoice" aria-selected="false">Create Invoice</Link>
                                    : null
                                }
                                <Link to={`/dashboard/${props.match.params.id}/findinvoice`} className="nav-link" id="read-invoice-tab" data-toggle="tab" href="#readinvoice" role="tab" aria-controls="readinvoice" aria-selected="false">
                                Find Invoice
                                </Link>
                                
                                </nav>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <hr/>
                <div>
                    <Switch>
                        <Route path="/dashboard/:id" component={()=> <Profile data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/createuser" component={()=> <Createuser data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/modifyuseraccess" component={()=> <Modifyuseraccess data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/createinvoice" component={()=> <Createinvoice data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/findinvoice" component={()=> <Findinvoice data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/updateinvoice" component={()=> <Updateinvoice data={userdata[0]}/>} exact={true}/>
                        <Route path="/dashboard/:id/deleteinvoice" component={Deleteinvoice} exact={true}/>
                    </Switch>
                </div>  
            </>
            :<h1>{page}</h1>): <h1>Loading your dashboard....</h1>
        }
        </Router>
    </>
}