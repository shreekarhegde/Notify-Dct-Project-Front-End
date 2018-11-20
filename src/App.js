import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Department from '../src/components/department/department';
import AddDepartment from '../src/components/department/addDepartment';
import DepartmentDetails from '../src/components/department/departmentDetails'

const Index = () => (<h2> Home </h2>);

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
          <Link to="/"> Home </Link>
          </li>
          <li>
          <Link to="/departments/"> Departments </Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/departments/" component= {Department} exact/>
      <Route path="/departments/new" component={AddDepartment} />
      <Route path="/departments/:id" component={DepartmentDetails} exact/> 
      {/* {exact takes to next page} */}
    </div>
  </Router>
)

export default AppRouter;