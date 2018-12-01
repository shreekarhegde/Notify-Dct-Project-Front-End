import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class EditEmployeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                firstNameOfEmployee: this.props.location.state.employeeDetails.bio.firstName,
                lastNameOfEmployee: this.props.location.state.employeeDetails.bio.lastName,
                departmentofEmployee: this.props.location.state.employeeDetails.bio.department,  
                redirect: false,
                departments: this.props.location.state.departments
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
    }

    handleChangeFirstName(event) {
        event.preventDefault();
        this.setState({
            firstNameOfEmployee: event.target.value
        })
    }

    handleChangeDepartment(event) {
        this.setState({
            departmentofEmployee: event.target.value
        })
    }

    handleChangeLastName(event) {
        event.preventDefault();
        this.setState({
            lastNameOfEmployee: event.target.value   
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let submitValue = {
            bio: {
                firstName: this.state.firstNameOfEmployee,
                lastName: this.state.lastNameOfEmployee,
                department: this.state.departmentofEmployee,
                previousDepartment: this.props.location.state.employeeDetails.bio.department
            }
        }
        console.log(submitValue, 'submit value from edit');
        axios.put(`http://localhost:3001/employees/${this.props.match.params.id}`, submitValue).then((response) => {
            this.setState({
                redirect: true
            });
        })       
    }

    render() {
        //redirecting to employees page after adding a department
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/employees/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>{console.log(this.props.location.state.employeeDetails.bio, "location")}
                        First Name: <br/>
                        <input type="text" name="FirstName" onChange={this.handleChangeFirstName} value={this.state.firstNameOfEmployee}/><br/>
                    </label> 
                    <label>
                        Last Name<br/>
                        <input type="text" name="lastName" onChange={this.handleChangeLastName} value={this.state.lastNameOfEmployee}/><br/>
                    </label>
                    <label>
                        <div>
                            <select onChange={this.handleChangeDepartment}>{
                                this.state.departments.map((department, index) => {
                                    return <option key={index} value={department._id}>{department.departmentName}</option>
                                })
                            }</select>
                        </div>
                        <input type="submit" value="submit"/>
                    </label>
                </form>    
                <Link to="/employees">back</Link>
            </div>
        )
        
    }
}

export default EditEmployeeDetails;