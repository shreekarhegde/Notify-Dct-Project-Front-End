import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Badge, Alert, Card, CardText, Button, Input, Form, FormGroup, Row, Col, Label} from 'reactstrap';
import  ApplauseButton from '../applauseButton';
import AddPost from '../addPost';
import './departmentDetails.css'

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: this.props.location.state,
            posts: [],
            comments: [],
            redirect: false,
            postId: ``,
            body: ``
        }
        this.deleteHandle = this.deleteHandle.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleAddPost = this.handleAddPost.bind(this)
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
            axios.get(`http://localhost:3001/departments/posts/${this.props.match.params.id}`).then(
                (postsFromDepartments) => {
                    this.setState({
                        posts: []
                    })
                   this.setState({
                       posts: postsFromDepartments.data
                   })
            })
        }) 
    }


    componentDidMount(){
        axios.get(`http://localhost:3001/departments/posts/${this.props.match.params.id}`).then(
            (postsFromDepartments) => {
                console.log(postsFromDepartments, "dep posts");
                this.setState({
                    posts: postsFromDepartments.data,
                })
        })
    }

    deleteHandle(){
        axios.delete(`http://localhost:3001/departments/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        }); 
    }

        handleAddPost(posts) {
            this.state.posts.unshift(posts)
                this.setState({
                    posts: this.state.posts
                })
        }

    render() {
        //redirecting to departments page after deleting
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/departments/" exact />
        }
        return (
            <div>
                <h1 className="row justify-content-md-center">
                <Badge color="primary">
                    {this.state.departmentDetails.department.departmentName}
                </Badge>
                </h1>
                <br/>
                <Row>
                <Col className="col-md-9">
                <Alert className="row justify-content-md-center" color="primary">
                    {this.state.departmentDetails.department.about}
                </Alert>
                 <br/>
                 <AddPost departmentId={this.props.match.params.id} addPost={this.handleAddPost}/>
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
                    </Col>
                    <Col>
                    <div>
                    <Badge color="primary"><h6>events</h6></Badge>
                            {this.state.departmentDetails.department.activities.map((activity, index) => {
                                return <Link key={index} to="/activities"><li key={index}>{activity.activityName}</li></Link>
                            })}
                    <Badge color="primary"><h6>members of the department</h6></Badge>
                            {
                            this.state.departmentDetails.department.members.map(function(member, index){
                                    return <p key={index}><li key={index}>{member.bio.firstName}</li></p>
                                })
                            }
                    </div>  
                    </Col>
                </Row>
                
               

                <Link to={{pathname:`/departments/edit/${this.props.match.params.id}`, state:{departments: this.state.departmentDetails, posts: this.state.posts}}}>Edit</Link><br/>  

                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;