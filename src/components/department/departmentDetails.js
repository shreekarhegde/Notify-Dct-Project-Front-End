import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Badge, Alert, Card, CardText, Button, Input, Form, FormGroup} from 'reactstrap';
import  ApplauseButton from '../applauseButton';

class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: this.props.location.state,
            posts: [],
            comments: [],
            redirect: false,
            postId: ``,
        }
        this.deleteHandle = this.deleteHandle.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }


    handleSubmitComment(event){
        event.preventDefault();
        this.state.postId = event.target[1].value;
        if(event.target[0].value !== null &&  event.target[0].value !== ``){
            this.state.comments.push(event.target[0].value);
        }
        let applause = {
            applause: this.state.applause,
            comments: this.state.comments
        };

        axios.put(`http://localhost:3001/posts/${this.state.postId}`, applause).then((responseFromButton) => {
             console.log(responseFromButton.data, "data");
        })    
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/posts/${this.props.match.params.id}`).then(
            (postsFromDepartments) => {
                console.log(postsFromDepartments.data, "posts")
                this.setState({
                    posts: postsFromDepartments.data
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
                </Badge></h1><br/>

                <Alert className="row justify-content-md-center" color="primary">
                    {this.state.departmentDetails.department.about}
                </Alert>

                 <br/>

                {this.state.posts.map((post, index) => {
                   return (<div key={index}>
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
                })}

                {/* <b>events</b>
                {this.state.departmentDetails.department.activities.map((activity, index) => {
                    return <Link to="/activities"><li key={index}>{activity.activityName}</li></Link>
                })}


                <h5>Members of the department</h5>
                {
                this.state.departmentDetails.department.members.map(function(member, index){
                        return <p key={index}><li key={index}>{member.bio.firstName}</li></p>
                    })
                } */}

                <Link to={{pathname:`/departments/edit/${this.props.match.params.id}`, state:{departments: this.state.departmentDetails, posts: this.state.posts}}}>Edit</Link><br/>  

                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;