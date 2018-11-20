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
                       <Link to={`departments/${department.departmentName}`}>{department.departmentName}</Link>
                    </li>)
                )}
            </div>
        )
    }
}

export default Department;

