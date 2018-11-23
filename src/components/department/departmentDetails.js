import React from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';
import Department from '../department/department';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: {},
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
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                {this.state.departmentDetails.departmentName}<br/>
                {this.state.departmentDetails.about} <br/>
                <Link to={`/departments/edit/${this.props.match.params.id}`}>edit</Link><br/>
                <Link to={`/departments/${this.props.match.params.id}`}  onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;