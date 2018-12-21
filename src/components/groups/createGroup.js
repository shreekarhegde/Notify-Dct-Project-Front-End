import React from 'react';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import {Button, Form, FormGroup, Label, Input, FormText ,Span, Card, CardBody} from 'reactstrap';
class CreateNewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: ``,
            groupNameError:``,
            privacyError:``,
            membersError:``,
            privacy: ``,
            members: [],
            employees: this.props.location.state.employees,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handleNewMembers = this.handleNewMembers.bind(this);
    }

    validate=()=>{
        let isError = false;
        const errors = {
            groupNameError: ``,
            privacyError: ``,
            membersError: ``
        }
        if(this.state.groupName.length < 3){
            isError = true;
            errors.groupNameError = 'Group name should be atleast three characters long';
        }
        if(this.state.privacy==0){
            isError = true;
            errors.privacyError = 'Privacy mode is required';
        }
        if(this.state.members.length<1){
            isError = true;
            errors.membersError = 'Atleast one member is required';
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError;
    }

    handleNewMembers(event) {
        this.state.members.push(event.target.value);
    }

    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            groupName: event.target.value
        })
    }

    handlePrivacy(event) {
        event.preventDefault();
        this.setState({
            privacy: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const err = this.validate();
        if(!err){
            this.setState({
                groupNameError: ``,
                privacyError: ``,
                membersError: ``
            })
        let submitValue = {
            groupName: this.state.groupName,
            privacy: this.state.privacy,
            members: this.state.members
        }
        console.log(submitValue);
        axios.post('http://localhost:3001/groups', submitValue).then(() => {
            this.setState({
                redirect: true
            });
        })
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }
    }



    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/groups/" exact />
        }
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-8">
            <Card outline color="primary"><CardBody>
                <Form onSubmit={this.handleSubmit}>
                <br/><br/>
                <FormGroup>
                    <Label>Group Name</Label>
                        {/* Group Name: <br /> */}
                        <input type="text" errortext={this.state.groupNameError} name="newGroupName" onChange={this.handleChangeText} value={this.state.groupName} />
                    </FormGroup><FormGroup>
                    <span style={{color:"red"}}>{this.state.groupNameError}</span>                   
                    </FormGroup>
                    <br/>
                    <FormGroup>
                    <Label>Privacy</Label>
                        {/* Privacy: <br /> */}
                        <div><select errortext={this.state.privacyError} name="privacy" onClick={this.handlePrivacy}>
                                        <option>select</option>
                                        <option value="private">Private </option>
                                        <option value="public">public</option></select><br /></div>
                                        </FormGroup>
                  <FormGroup><br/>
                  <span>{this.state.privacyError}</span>
                  </FormGroup><FormGroup>
                    <Label>All Employees</Label>
                    {/* All Employees: <br/> */}
                        {this.state.employees.map((employee, index) => {
                           
                            return <div key={index}><input type="checkbox" onChange={this.handleNewMembers} key={index} value={employee._id}/>{employee.bio.firstName}<br /></div>

                        })}
                    </FormGroup>
                    <FormGroup><span style={{color:"red"}}>{this.state.membersError}</span></FormGroup>
                    <FormGroup><br/>
                    {/* <Input type="submit" value="submit" style={{width:"40%", Color: 'success' }} /> */}
                    <Button outline style={{width:"40%", Color: 'success' }} color="success">submit</Button>
                    </FormGroup>
                </Form>
                </CardBody>
                </Card></div>
            <div className="col-md-4">
             <Button outline style={{width:"40%"}} color="primary"> <Link to="/groups/">back</Link></Button>
            </div></div></div>
        )
    }
}

export default CreateNewGroup;