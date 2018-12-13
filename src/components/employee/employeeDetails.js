import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Chat from './chat';
import MyCalendar from './employeeCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Row, Col, Container} from 'reactstrap';

class EmployeeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employeeDetails: this.props.location.state.details,
            departments: this.props.location.state.departments,
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
    }


    deleteHandle(){
        axios.delete(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        });
    }


    render() {
        //redirecting to departments page after deleting
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/employees/" exact />
        }

        if(this.state.employeeDetails.bio.department == undefined){
            return (
                <div>
                    {this.state.employeeDetails.bio.firstName} <br/><br/>

                    <Link to={{pathname:`/employees/edit/${this.props.match.params.id}`, state:{employeeDetails: this.state.employeeDetails, departments: this.state.departments}}}>Edit</Link><br/><br/>

                    <Link to={`/employees/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                
                    <Link to="/employees">back</Link>
                </div>
            )  
        }
            return (
                <div>  
                    <Container>
                        <Row>
                            <Col>
                            <b>Department</b><br/>
                                <Link to="/departments">{this.state.employeeDetails.bio.department.departmentName}</Link><br/>
                            </Col>
                        <Col>
                            <b>Name</b><br/>
                            {this.state.employeeDetails.bio.firstName} <br/><br/>
                        </Col>
                        <Col>
                            <b>Activities</b>
                            { this.state.employeeDetails.activities.map((activity, index) => {
                                return <Link key={index} to="/activities"><li key={index}>{activity.activityName}</li></Link>
                            })}<br/>
                        </Col>
                        <Col>
                            <div>
                                <Link to={{pathname:`/employees/edit/${this.props.match.params.id}`, state:{employeeDetails: this.state.employeeDetails, departments: this.state.departments}}}>Edit</Link><br/>

                                <Link to={`/employees/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>

                                <Link to="/employees">back</Link><br/>
                            </div>  
                        </Col>
                    </Row>
                    </Container>
                    <Row>
                        <Col sm="12" md={{ size: 7, offset: 4 }} className="row justify-content-md-center">
                            <Chat/>
                        </Col>  
                   </Row><br/> 
                    
                <Row> 
                    <MyCalendar activities={this.state.employeeDetails.activities}/>      
                </Row> 
                </div>
            ) 
        // }       
    }
}

export default EmployeeDetails;