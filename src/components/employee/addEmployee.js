import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameOfEmployee: ``,
            firstNameError: ``,
            lastNameOfEmployee: ``,
            lastNameError: ``,
            departmentofEmployee: ``,
            departmentError: ``,  
            bio: '',
            redirect: false,
            departments: this.props.location.state.departments,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            firstNameError: ``,
            lastNameError: ``,
            departmentError: ``
        }

        if(this.state.firstNameOfEmployee.length < 3){
            console.log(this.state.firstNameOfEmployee);
            isError = true;
            errors.firstNameError = 'first name should be atleast three characters long';
        }

        if(this.state.lastNameOfEmployee.length < 1){
            isError = true;
            errors.lastNameError = 'last name should have atleast one character';
        }

        if(this.state.departmentofEmployee == ''){
            errors.departmentError = 'select a department'
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
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
        const err = this.validate();
        if(!err){
            this.setState({
                firstNameError: ``,
                lastNameError: ``,
                departmentError: ``
            })
            let submitValue = {
                bio: {
                    firstName: this.state.firstNameOfEmployee,
                    lastName: this.state.lastNameOfEmployee,
                    department: this.state.departmentofEmployee
                }
            }
            axios.post('http://localhost:3001/employees', submitValue).then((response) => {
                this.setState({
                    redirect: true
                });
            })   
        }
            
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
                    <label>
                        First Name: <br/>
                        <input type="text" name="FirstName" onChange={this.handleChangeFirstName} value={this.state.firstNameOfEmployee}/><br/>
                    </label><span>{this.state.firstNameError}</span> 
                    <label>
                        Last Name<br/>
                        <input type="text" name="lastName" errortext={this.state.lastNameError} onChange={this.handleChangeLastName} value={this.state.lastNameOfEmployee}/><br/>
                    </label><span>{this.state.lastNameError}</span>
                    <label>
                        <div>
                            <select errortext={this.state.departmentError} onClick={this.handleChangeDepartment}>{
                                this.state.departments.map((department, index) => {
                                    return <option key={index} value={department._id}>{department.departmentName}</option>
                                })
                            }</select>
                        </div><span>{this.state.departmentError}</span><br/>
                        <input type="submit" value="submit"/>
                    </label>
                </form>    
                <Link to="/employees">back</Link>
            </div>
        )
        
    }
}

export default AddEmployee;