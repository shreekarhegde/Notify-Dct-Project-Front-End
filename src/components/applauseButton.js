import React from 'react';
import { Badge, Alert, Card, CardText, Button, Input, Form, FormGroup} from 'reactstrap';


class ApplauseButton extends React.Component {
    constructor(props){
        super(props);
       this.state = {
           applause: props.button.applause,
           isButtonClicked: false,
           applauseText: `applause`
       }
       this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState(prevState => ({
            isButtonClicked: true,
            applauseText: `Applauded`,
            applause: prevState.applause + 1
        })) 
    }

    render(){
        return (<div>
        <Button onClick={this.handleOnClick} className="col-3" color="white" disabled={this.state.isButtonClicked}>
            {this.state.applauseText} - {this.state.applause}
        </Button><br/>
        </div>
        )
    }
}

export default ApplauseButton;