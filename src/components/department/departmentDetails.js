import React from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: {},
            redirect: false
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
            this.setState({
                departmentDetails: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.departmentDetails.departmentName}<br/>
                {this.state.departmentDetails.about} <br/>
                <Link to={`/departments/edit/${this.props.match.params.id}`}
                >edit</Link><br/>
                <Link to="/departments"> back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;