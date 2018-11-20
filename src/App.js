import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Department from '../src/components/department/department';
import addDepartment from '../src/components/department/addDepartment';

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
          <Link to="/departments"> Departments </Link>
          <Link to="/departments/name">{addDepartment}</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/departments" component={Department} exact />
      <Route path="/departments" component={addDepartment} exact />
    </div>
  </Router>
)

export default AppRouter;