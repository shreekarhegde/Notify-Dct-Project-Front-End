import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Department extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: [],
            employees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/departments').then((responseFromDepartments) => {
            console.log(responseFromDepartments, "departments");
            this.setState({
                departments: responseFromDepartments.data
            })
        })
        axios.get('http://localhost:3001/employees').then((responseFromEmployees) => {
            console.log(responseFromEmployees, "employees");
            this.setState({
                employees: responseFromEmployees.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.departments.map((department, index) => (
                    <li key={index}>
                       <Link to={{pathname:`/departments/${department._id}`, state:{department: department}}} >{department.departmentName}</Link>
                    </li>)
                )}
                <Link to={{pathname:"/departments/new", state: {employees: this.state.employees}}}>Add Department</Link>
            </div>
        )
    }
}

export default Department;

