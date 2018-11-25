import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class EmployeeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employeeDetails: {},
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
            this.setState({
                employeeDetails: response.data
            })
        })
    }

    deleteHandle(){
        axios.delete(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        });
       ;    
    }

    render() {
        //redirecting to departments page after deleting
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/employees/" exact />
        }
        return (
            <div>
                {this.state.employeeDetails.department}<br/>
                {this.state.employeeDetails.employee} <br/>
                <Link to={`/employees/edit/${this.props.match.params.id}`}>Edit</Link><br/>
                <Link to={`/employees/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/employees">back</Link>
            </div>
        )
    }
}

export default EmployeeDetails;