import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: this.props.location.state.department,
            redirect: false,
            employees: this.props.location.state.employees
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    
    deleteHandle(){
        axios.delete(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
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
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                <h5>name</h5><br/>
                <p>{this.state.departmentDetails.departmentName}</p>

                <h5>about</h5>
                {this.state.departmentDetails.about} <br/>

                <h5>Members of the department</h5>
                {
                this.state.departmentDetails.members.map(function(member, index){
                        return <p key={index} to={`/employees/${member._id}`}><li key={index}>{member.bio.firstName}</li></p>
                    })
                }
                
                <b>events</b>
                {this.state.departmentDetails.activities.map((activity, index) => {
                    return <Link key={index} to="/activities"><li key={index}>{activity.activityName}</li></Link>
                })}
                
                <Link to={{pathname:`/departments/edit/${this.props.match.params.id}`, state:{departments: this.state.departmentDetails, employees: this.state.employees}}}>Edit</Link><br/>  

                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;