import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class AddDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfTheDepartment: ``,
            nameError: ``,
            aboutTheDepartment: ``,
            aboutError: ``,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: ``,
            aboutError: ``
        }

        if(this.state.nameOfTheDepartment.length < 3){
            isError = true;
            errors.nameError = 'name of the department should be atleast 3 characters long';
        }

        if(this.state.aboutTheDepartment.length < 5){
            isError = true;
            errors.aboutError = 'information about the department should be atleast 5 characters long';
        }  

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            nameOfTheDepartment: event.target.value
        })
    }

    handleChangeAbout(event) {
        event.preventDefault();
        this.setState({
            aboutTheDepartment: event.target.value   
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const err = this.validate();
        console.log(err,"err");
        if(!err){
            this.setState({
                nameError: ``,
                aboutError: ``
            })
            let submitValue = {
                departmentName: this.state.nameOfTheDepartment,
                about: this.state.aboutTheDepartment
            }
            axios.post('http://localhost:3001/departments', submitValue).then((response) => {
                this.setState({
                    redirect: true
                });
            })      
        } 
    }

   
   
    render() {
        //redirecting to departments page after adding a department
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Department Name: <br/>
                        <input type="text" errortext={this.state.nameError} name="departmentName" onChange={this.handleChangeText} value={this.state.departmentName}/><br/>
                    </label><span>{this.state.nameError}</span><br/> 
                    <label>
                        About:<br/>
                        <input type="textarea" errortext={this.state.aboutError} onChange={this.handleChangeAbout} value={this.state.about}/><br/>
                        <input type="submit" value="submit"/><br/>
                    </label><span>{this.state.aboutError}</span>     
                </form>    
                <Link to="/departments">back</Link>
            </div>
        )
        
    }
}

export default AddDepartment;