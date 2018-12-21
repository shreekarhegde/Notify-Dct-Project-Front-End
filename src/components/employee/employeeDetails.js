import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Chat from './chat';
import MyCalendar from './employeeCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Row, Col, Container} from 'reactstrap';
import AddPost from '../addPost';
import {Label, Card, Form, FormGroup, CardText, Button, Input, Alert} from 'reactstrap';
import ApplauseButton from '../applauseButton';

class EmployeeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employeeDetails: this.props.location.state.details,
            departments: this.props.location.state.departments,
            posts: [],
            postId: ``,
            body: ``,
            redirect: false
        }
        this.deleteHandle = this.deleteHandle.bind(this);
        this.handleAddPost = this.handleAddPost.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleAddPost(posts){
        this.state.posts.unshift(posts)
        this.setState({
            posts: this.state.posts
        })
    }

    handleSubmitComment(event){
        event.preventDefault();
        this.state.postId = event.target[1].value;
        if(event.target[0].value !== null &&  event.target[0].value !== ``){
            this.state.comments = event.target[0].value;
        }
        let applause = {
            applause: this.state.applause,
            comments: this.state.comments
        };
        axios.put(`http://localhost:3001/posts/${this.state.postId}`, applause).then((responseFromButton) => {
            axios.get(`http://localhost:3001/employees/posts/${this.props.match.params.id}`).then(
                (postsFromEmployees) => {
                    this.setState({
                        posts: []
                    })
                   this.setState({
                       posts: postsFromEmployees.data
                   })
            })
        }) 
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/employees/posts/${this.props.match.params.id}`).then(
            (postsFromEmployees) => {
                this.setState({
                    posts: postsFromEmployees.data,
                })
        })
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
                        <AddPost userId={this.props.match.params.id} addPost={this.handleAddPost}/>
                    </Row>
                    <Row>
                    <Label className="scroller" >
                {this.state.posts.map((post, index) => {
                   return (
                   <div backgroundcolor="secondary" key={index}>
                       <Card body key={index}>
                            <CardText className="row-justify-content-md-center">{post.body}</CardText><br/><br/>

                            <ApplauseButton button={post}/><br/>

                            <Form onSubmit={this.handleSubmitComment}><b> {post.comments.length} - Comments</b> 
                                <FormGroup>
                                    <Input placeholder="Add a comment" type="textarea"/>
                                </FormGroup>
                                <Button value={post._id} type="submit" color="primary">Comment</Button>
                            </Form><br/>
                            
                          {post.comments.map((comment, index) => {
                                return (
                                <Alert key={index}><p >{comment}</p></Alert>)
                            })}
                        </Card>
                   </div>)        
                })}</Label><br/>
                    </Row>
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
                            <Chat employeeName={this.state.employeeDetails.bio.firstName} />
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