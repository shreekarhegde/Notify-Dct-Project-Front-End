import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: [],
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
            this.setState({
                departmentDetails: response.data
            })
            console.log(this.state.departmentDetails);
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
                {this.state.departmentDetails.departmentName}<br/>
                {this.state.departmentDetails.about} <br/>
                {/* {this.state.departmentDetails.events.map((member) => (
                    <li>{member}</li>
                ))} */}
                {/* {this.state.departmentDetails.members} */}
                <Link to={`/departments/edit/${this.props.match.params.id}`}>Edit</Link><br/>
                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;