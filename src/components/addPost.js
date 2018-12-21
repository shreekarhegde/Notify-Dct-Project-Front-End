import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

class AddPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: ``,
            departmentId: ``,
            userId: ``
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.state.post = event.target.value;
        this.setState({
            departmentId: this.props.departmentId,
            userId: this.props.userId
        })    
    }

    handleSubmit(event){
        // console.log(event.target.value);
        event.preventDefault();
        let submitValue = {
            body: this.state.post,
            department: this.state.departmentId,
            profile: this.state.userId
        }
        console.log(submitValue, "value");
        axios.post('http://localhost:3001/posts', submitValue).then((res) => {
            console.log(res.data);
            this.props.addPost(res.data);
        })
    }
   
    render(){
        return(
            <div><b>Whats on your mind ?</b>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="textarea" placeholder="write something here" value={this.state.post} onChange={this.handleChange}/>
                            <Button color="primary" type="submit">Post</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default AddPost;