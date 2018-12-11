import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

class AddPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: ``,
            id: ``
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.state.post = event.target.value;
        this.setState({
            id: this.props.departmentId
        })    
    }

    handleSubmit(event){
        // console.log(event.target.value);
        event.preventDefault();
        let submitValue = {
            body: this.state.post,
            department: this.state.id
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