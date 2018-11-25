import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                firstNameOfEmployee: ``,
                lastNameOfEmployee: ``,
                departmentofEmployee: ``,  
                bio: '',
                listOfDepartments: [],
                redirect: false  
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
        event.preventDefault();
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
                department: this.state.departmentofEmployee
            }
        }
       
        axios.post('http://localhost:3001/employees', submitValue).then((response) => {
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
                    <label>
                        First Name: <br/>
                        <input type="text" name="FirstName" onChange={this.handleChangeFirstName} value={this.state.firstName}/><br/>
                    </label> 
                    <label>
                        Last Name<br/>
                        <input type="text" name="lastName" onChange={this.handleChangeLastName} value={this.state.lastName}/><br/>
                    </label>
                    <label>
                         Department<br/>
                         <input type="text" name="Department" onChange={this.handleChangeDepartment} value={this.state.department}/>
                        <input type="submit" value="submit"/>
                    </label>    
                </form>    
                <Link to="/employees">back</Link>
            </div>
        )
        
    }
}

export default AddEmployee;