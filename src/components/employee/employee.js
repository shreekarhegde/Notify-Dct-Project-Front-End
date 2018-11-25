import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Employee extends React.Component {
    constructor() {
        super();
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/employees').then((response) => {
            this.setState({
                employees: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.employees.map((employee, index) => (
                    <li key={index}>
                       <Link to={`/employees/${employee._id}`}>{employee.bio.firstName}</Link>
                    </li>)
                )}
                <Link to="/employees/new">Add employee</Link>
            </div>
        )
    }
}

export default Employee;

