import React from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';
import EditDepartment from './editDepartment';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: {}
        }
        this.clickHandle = this.clickHandle.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
            this.setState({
                departmentDetails: response.data
            })
        })
    }

    clickHandle(){
        console.log('hi');
        return (
            // <Route path={`/departments/${this.props.match.params.id}`} component={EditDepartment}/>
         <Redirect from="/departments/:id" to="/departments/:id" component={EditDepartment} />
        // <EditDepartment />
        )
    }

    render() {
        return (
            <div>
                {this.state.departmentDetails.departmentName}<br/>
                {this.state.departmentDetails.about} <br/>
                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.clickHandle}>edit</Link><br/>
                <Link to="/departments"> back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;