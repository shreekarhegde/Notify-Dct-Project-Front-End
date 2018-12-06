import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Badge, Alert, Card, CardText, Button, Input, Form, FormGroup} from 'reactstrap';


class DepartmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            departmentDetails: this.props.location.state,
            posts: [],
            redirect: false,
            buttonClicked: false,
            comments: [],
            postId: ``,
            applauseText: `Applause`
        }
        this.deleteHandle = this.deleteHandle.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleOnClick() {
        this.setState(prevState => ({
            applause: prevState.applause + 1,
            buttonClicked: true,
            applauseText: `Applauded`
        })) 
    }

    handleSubmitComment(event){
        event.preventDefault();
        this.state.comments.push(event.target[0].value);
        let applause = {
            applause: this.state.applause,
            comments: this.state.comments
        };
        console.log(applause, "applause");
        axios.put(`http://localhost:3001/posts/${this.state.postId}`, applause).then((responseFromButton) => {
            // console.log(responseFromButton);
        })    
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/departments/posts/${this.props.match.params.id}`).then(
            (postsFromDepartments) => {
                postsFromDepartments.data.map((post,index) => {
                    this.setState({
                        postId: post._id,
                        applause: post.applause
                    })
                })
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

                {this.state.posts.map((post, index) =>{
                   return <Card body key={index}>
                                <CardText className="row-justify-content-md-center">{post.body}</CardText>
                                <Button onClick={this.handleOnClick} className="col-3" color="white" disabled=       {this.state.buttonClicked}>
                                    {this.state.applauseText} - {this.state.applause}
                                </Button><br/>
                                <Form onSubmit={this.handleSubmitComment}> Comments- {this.state.comments.length}
                                <FormGroup>
                                    <Input placeholder="Add a comment" type="textarea"/>
                                </FormGroup>
                                <Button type="submit" value="comment" color="primary">Comment</Button>
                                </Form>
                            </Card>
                })}

                <b>events</b>
                {this.state.departmentDetails.department.activities.map((activity, index) => {
                    return <Link to="/activities"><li key={index}>{activity.activityName}</li></Link>
                })}


                <h5>Members of the department</h5>
                {
                this.state.departmentDetails.department.members.map(function(member, index){
                        return <p key={index}><li key={index}>{member.bio.firstName}</li></p>
                    })
                }

                <Link to={{pathname:`/departments/edit/${this.props.match.params.id}`, state:{departments: this.state.departmentDetails, posts: this.state.posts}}}>Edit</Link><br/>  

                <Link to={`/departments/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link><br/>
                <Link to="/departments">back</Link>
            </div>
        )
    }
}

export default DepartmentDetails;