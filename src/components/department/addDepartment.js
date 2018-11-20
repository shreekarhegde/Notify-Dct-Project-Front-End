import React from 'react';
import axios from 'axios';

class addDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfTheDepartment: ``,
            aboutTheDepartment: ``
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeAbout = this.handleChangeAbout.bind(this);
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
        let submitValue ={
            departmentName: this.state.nameOfTheDepartment,
            about: this.state.aboutTheDepartment
        }
        axios.post('http://localhost:3001/departments', submitValue).then((response) => {
            const newDepartment = [...this.state.nameOfTheDepartment, response.data];
            this.setState(prevState => ({
                nameOfTheDepartment: newDepartment
            }))
        })
    }
    
   
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Department Name: <br/>
                        <input type="text" name="departmentName" onChange={this.handleChangeText} value={this.state.departmentName}/><br/>
                    </label> 
                    <label>
                        About:<br/>
                        <input type="textarea" onChange={this.handleChangeAbout} value={this.state.about}/><br/>
                        <input type="submit" value="submit"/>
                    </label>    
                </form>    
            </div>
        )
    }
}

export default addDepartment;