import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, CardDeck } from 'reactstrap';

class Department extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/departments').then((response) => {
            this.setState({
                departments: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {/* {this.state.departments.map((department, index) => (
                    <li key={index}>
                       <Link to={{pathname:`/departments/${department._id}`, state:{department: department}}} >{department.departmentName}</Link>
                    </li>)
                )} */}
                {this.state.departments.map((department, index) => {
                     return (<Row key={index} className="row justify-content-md-center">
                     <Col sm="6">
                        <Card body>
                        <CardTitle className="row justify-content-md-center">{department.departmentName.toUpperCase()}</CardTitle>
                        <Button color="white">
                            <Link to={{pathname:`/departments/${department._id}`, state:{department: department}}  }>Visit This Department
                            </Link>
                        </Button>
                        </Card>
                     </Col>
                 </Row>)
                })}
               
                <Link className="row justify-content-md-center" to="/departments/new">Add Department</Link>
            </div>
        )
    }
}

export default Department;

