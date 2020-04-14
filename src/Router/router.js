import React from "react";
import { Route } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login";
import newTask from '../Components/newTask'
import Dashboard from "../Components/Dashboard";
import Header from "../header";
const ReactRouter =()=>{
return (
<React.Fragment>
{/* <Header /> */}
<Route exact path="/" component={Login} />
<Route  path="/dashboard" component={Dashboard} />
</React.Fragment>
);}
export default ReactRouter;