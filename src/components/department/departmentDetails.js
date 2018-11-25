import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: {
                members: []
            },
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
            this.setState({
                departmentDetails: response.data
            })
        })
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
                {this.state.departmentDetails.departmentName}
                <h5>about</h5>
                {this.state.departmentDetails.about} <br/>
                <h5>Members of the department</h5>
                {
                this.state.departmentDetails.members.map(function(member, index){
                        return <li key={index}>{member.bio.firstName}</li>
                    })
                }
                
               
                <Link to={`/departments/edit/${this.props.match.params.id}`}>Edit</Link><br/>
                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;