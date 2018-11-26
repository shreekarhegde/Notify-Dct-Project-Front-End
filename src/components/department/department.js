import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Department extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/departments').then((response) => {
            console.log(response.data,"response");
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
                       <Link to={{pathname:`/departments/${department._id}`, state:{department: department}}} >{department.departmentName}</Link>
                    </li>)
                )}
                <Link to="/departments/new">Add Department</Link>
            </div>
        )
    }
}

export default Department;

