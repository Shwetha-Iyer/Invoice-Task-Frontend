import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './main';
import Login from './login';
import Forgot from './forgot';
import Dashboard from './dashboard';
function App() {
  return <>
  <div>
  <Router>
    <Switch>
      <Route path="/" component={Main} exact={true}></Route>
      <Route path="/login" component={Login} exact={true}></Route>
      <Route path="/forgot" component={Forgot} exact={true}></Route>
      <Route path="/dashboard/:id" component={Dashboard} exact={true}></Route>
    </Switch>
  </Router>
  </div>
  </>
}

export default App;
