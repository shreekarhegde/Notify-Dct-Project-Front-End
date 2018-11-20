import React from 'react';
import axios from 'axios';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: {}
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
            console.log(response.data);
            this.setState({
                departmentDetails: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.departmentDetails.departmentName}<br/>
                {this.state.departmentDetails.about}
            </div>
        )
    }
}

export default DepartmentDetails;