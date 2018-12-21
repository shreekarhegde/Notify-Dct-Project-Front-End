import React from 'react';
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
import { Form,FormGroup,Label,Input,  Button } from 'reactstrap';

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nameOfGroup: this.props.location.state.group.groupName,
            groupError:``,
            privacy: this.props.location.state.group.privacy,
            members: this.props.location.state.group.members,
            posts: this.props.location.state.group.posts,
            events: this.props.location.state.group.events,
            allEmployees:this.props.location.state.allEmployees,
            updatedMembersList: [],
            group:this.props.location.state.group
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(event){
        console.log(this.state.updatedMembersList,"event")
        if(this.state.updatedMembersList.find(elementID=>elementID==event.target.value)){
                this.state.updatedMembersList.splice((this.state.updatedMembersList.indexOf(event.target.value)),1)
        }else{
            this.state.updatedMembersList.push(event.target.value)
        }
        console.log(this.state.updatedMembersList,'www')
    }
    handleChangeText(event) {
        event.preventDefault();
        this.setState({
            nameOfGroup: event.target.value
        })
    }
    handlePrivacy(event) {
        console.log(event);
        event.preventDefault();
        this.setState({
            privacy: event.target.value
        })
    }
    
    handleSubmit(event){
        event.preventDefault();
        if(this.props.location.state.group.groupName!=this.state.nameOfGroup||this.props.location.state.group.privacy!=this.state.privacy||this.props.location.state.group.members!=this.state.updatedMembersList){
            let submitValue={
                groupName:this.state.nameOfGroup,
                privacy:this.state.privacy,
                members:this.state.updatedMembersList
            }
            console.log(submitValue,"submitvalue");
            axios.put(`http://localhost:3001/groups/${this.props.match.params.id}`, submitValue).then((response) => {
                this.setState({
                    redirect: true
                });
                console.log(submitValue,"submitvalue2");

            })
        }else{
            this.setState({
                groupError:`Please commit any changes for a successful submit`
            })
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/groups/" exact />
        }
        return (
            <div className="container"><br/><br/>
            <div className="row"><div className="col-sm-11">
                <Form onSubmit={this.handleSubmit}>
                <div className="row"><div className="col">
                <FormGroup>
                    <Label> New Group Name</Label>
                    <Input type="text" errortext={this.state.groupNameError} name="groupName" onChange={this.handleChangeText} value={this.state.nameOfGroup} /><br />
                    </FormGroup></div></div>
                    <FormGroup>
                    <div className="row"><div className="col-sm-3">
                    <Label>Change privacy</Label> </div><div className="col-sm-9">
                    <div><select errortext={this.state.privacyError} name="privacy" onClick={this.handlePrivacy}>
                                        <option>select</option>
                                        <option value="private">Private </option>
                                        <option value="public">public</option></select><br /></div></div></div>
                    </FormGroup><FormGroup>
                    <div className="row"><div className="col-sm-3">
                    <Label> All Members</Label></div><div className="col-sm-9" style={{height:"300px",overflow:"scroll"}}>
                    <div className="row"><div className="col offset-1">
                    {console.log(this.state.allEmployees, "all")}
                    {this.state.allEmployees.map((employee, index) => {
                                if(this.state.members.find(element=>element._id==employee._id)){
                                        if(employee.groups.find(group=>group._id==this.state.group._id)){
                                    this.state.updatedMembersList.push(employee._id)
                                    }
                                    return ( <div  key={`i${index}`}><Input  onClick={this.handleChange} key={index} type="checkbox" value={employee._id}/>Remove:{employee.bio.firstName}<br/></div>)
                                }else{
                                    return <div key={`i2${index}`}><Input  onChange={this.handleChange} key={index} type="checkbox" value={employee._id}/>{employee.bio.firstName}<br/></div>
                                }
                            })}</div></div></div></div>
                    </FormGroup><div className="row"><div className="col"><FormGroup>
                    <Button outline color="primary" style={{width:"100%"}} value="submit">Submit</Button>
                    <span style={{color:"red"}}>{this.state.groupError}</span><br/><br/></FormGroup></div></div>
                </Form></div>
                <div className="col-sm-1">
                    <Link to="/groups">back</Link>
                    </div></div></div>
        )
    }
}


export default EditGroup