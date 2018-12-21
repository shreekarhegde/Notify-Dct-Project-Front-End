import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col, CardDeck, NavLink } from 'reactstrap';


class Groups extends React.Component {
    constructor() {
        super();
        this.state = {
            groups: [],
            employees:[]
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:3001/groups').then((responseOfGroup) => {
            axios.get('http://localhost:3001/employees').then((responseOfEmployee) => {
            this.setState({
                groups: responseOfGroup.data,
                employees:responseOfEmployee.data

            })
            console.log(this.state.employees,"iii");
        })
    })
    }

    render() {
        return (
            <div className="container">
             <div className="row">
               <div className="col-md-8" style={{height:"600px",overflow:"scroll"}}>
                {this.state.groups.map((group, index) =>{
                return (<Row key={index} className="row justify-content-md-center">
                       <Col sm="6">
                        <Card body  outline color="primary" style={{width:"150%", height:"93%", borderColor: 'primary' }} >
                        <CardTitle className="row justify-content-md-center">{group.groupName.toUpperCase()}</CardTitle>
                        <Button color="white">
                        <Link to= {{pathname:`/groups/${group._id}`,state:{group:group,employees:this.state.employees}}} >More...
                        </Link>
                        </Button>
                        </Card>
                        </Col>
                        </Row>)
                })}
                </div>

               <div className="col-md-4">
               <br/>
                <br/><br/><br/>{console.log(this.state.groups,"groups")}
               <Button outline color="primary"  background="success"><Link to={{pathname:"/groups/new",state:{employees:this.state.employees}}}>Create Group</Link> </Button>
               </div>
             </div>
            </div>
        )
    }
}

export default Groups;