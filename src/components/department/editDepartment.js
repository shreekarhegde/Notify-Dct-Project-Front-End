import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfTheDepartment: this.props.location.state.departments.department.departmentName,
            aboutTheDepartment: this.props.location.state.departments.department.about
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
    }

    
    handleChangeName(event) {
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
        let submitValue = {
            departmentName: this.state.nameOfTheDepartment,
            about: this.state.aboutTheDepartment
        }
        axios.put(`http://localhost:3001/departments/${this.props.match.params.id}`, submitValue).then((response) => {
            this.setState({
                redirect: true
            });
        })
    }
    
   
    render() {
        {console.log(this.props.location.state.departments.department.about)}
        //this redirect is not working
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                {/* {console.log(this.props.location.state.departments.department)} */}
                    <label>
                        New Name: <br/>
                        <input type="text" onChange={this.handleChangeName} value={this.state.nameOfTheDepartment}/><br/>
                    </label> 
                    <label>
                        Change 'About' here:<br/>
                        <input type="textarea" onChange={this.handleChangeAbout} value={this.state.aboutTheDepartment}/><br/>
                        <input type="submit" value="submit"/>
                    </label>    
                </form>    
            </div>
        )
    }
}

export default EditDepartment;