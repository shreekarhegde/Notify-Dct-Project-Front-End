import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Department from '../src/components/department/department';
import AddDepartment from '../src/components/department/addDepartment';
import DepartmentDetails from '../src/components/department/departmentDetails'
import EditDepartment from '../src/components/department/editDepartment';
import Employee from './components/employee/employee';
import EmployeeDetails from './components/employee/employeeDetails';
import AddEmployee from './components/employee/addEmployee';
import EditEmployeeDetails from './components/employee/editEmployee';
import AddActivity from './components/activity/addActivity';
import ActivityDetails from './components/activity/activityDetails';
import Activity from './components/activity/activity';
import EditActivity from './components/activity/editActivity';
import { Navbar } from 'reactstrap';

const Index = () => (<h2> Home </h2>);

const AppRouter = () => (
  <Router>
    <div className="container">
     <Navbar fixed>
          <Link to="/">Home</Link>
          <Link to="/departments/"> Departments</Link>
          <Link to="/employees/"> Employees </Link>
          <Link to="/activities"> Activities </Link>    
     </Navbar>
       
     
      <Route path="/" exact component={Index} />
      <Route path="/activities/" component={Activity} exact/><br/>
      <Route path="/departments/" component= {Department} exact/><br/>
      <Route path="/employees/" component= {Employee} exact/><br/>
      <Switch>
        <Route path="/departments/new" component={AddDepartment} exact/>
        <Route path="/departments/:id" component={DepartmentDetails}  exact/> 
        <Route path="/departments/edit/:id" component={EditDepartment}  exact/>  
        <Route path="/employees/new" component={AddEmployee} exact/>
        <Route path="/employees/:id" component={EmployeeDetails}  exact/>
        <Route path="/employees/edit/:id" component={EditEmployeeDetails} exact/>
        <Route path="/activities/new" component={AddActivity} exact />
        <Route path="/activities/:id" component={ActivityDetails} exact />
        <Route path="/activities/edit/:id" component={EditActivity} exact />
      </Switch>

      {/* {exact takes to next page} */}
    </div>
  </Router>
)

export default AppRouter;