import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import DepartmentDetails from './departmentDetails';
import EditDepartment from './editDepartment';

class Department extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: [],
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            redirect: true
        });
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
                    </li>)
                )}
                <Link to="/departments/new">Add Department</Link>
            </div>
        )
    }
}

export default Department;

