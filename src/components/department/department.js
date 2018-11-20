import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import DepartmentDetails from './departmentDetails';
import AddDepartment from '../department/addDepartment'

class Department extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log('Hello');
    }

    componentDidMount() {
        axios.get('http://localhost:3001/departments').then((response) => {
            this.setState({
                departments: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.departments.map((department, index) => (
                    <li key={index}>
                       <Link to={`/departments/${department._id}`}>{department.departmentName}</Link>
                       <button onClick={this.handleClick}> edit </button>
                    </li>)
                )}
                <Route path={`/departments/:id`} component={DepartmentDetails} />
                <Link to="/departments/new">Add Department</Link>
            </div>
        )
    }
}

export default Department;

