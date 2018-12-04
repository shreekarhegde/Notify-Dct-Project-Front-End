import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class EmployeeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employeeDetails: this.props.location.state.details,
            departments: this.props.location.state.departments,
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    deleteHandle(){
        axios.delete(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        });
    }

    render() {
        //redirecting to departments page after deleting
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/employees/" exact />
        }

        if(this.state.employeeDetails.bio.department == undefined){
            return (
                <div>
                    {this.state.employeeDetails.bio.firstName} <br/><br/>

                    <Link to={{pathname:`/employees/edit/${this.props.match.params.id}`, state:{employeeDetails: this.state.employeeDetails, departments: this.state.departments}}}>Edit</Link><br/><br/>

                    <Link to={`/employees/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                
                    <Link to="/employees">back</Link>
                </div>
            )  
        }
            return (
                <div>
                    {this.state.employeeDetails.bio.department.departmentName}<br/>
                    {this.state.employeeDetails.bio.firstName} <br/><br/>

                    <Link to={{pathname:`/employees/edit/${this.props.match.params.id}`, state:{employeeDetails: this.state.employeeDetails, departments: this.state.departments}}}>Edit</Link><br/><br/>

                    <Link to={`/employees/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                
                    <Link to="/employees">back</Link>
                </div>
            ) 
        // }       
    }
}

export default EmployeeDetails;