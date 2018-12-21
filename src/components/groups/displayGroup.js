import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';


class EachGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eachgroup: this.props.location.state.group,
            allEmployees:this.props.location.state.employees,
            redirect:false
        }
        this.deleteHandle=this.deleteHandle.bind(this);
        {console.log(this.props.location.state.group,'group')}

    }
    deleteHandle(){
        axios.delete(`http://localhost:3001/groups/${this.props.match.params.id}`).then((response) => {
             this.setState({
                redirect: true
            })
        });
       ;    
    }
    render() {
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to="/groups/" exact/>
        }
        return (
            <div className="container"><br/>
            <div className="row">
            <div className="col-sm-2"><br/>
              Name</div><div className="col-sm-1"><br/>:</div><div className="col-sm-9"><br/>{this.state.eachgroup.groupName}</div></div><br/>
              <div className="row"><div className="col-sm-2"> 
              Privacy</div><div className="col-sm-1">:</div><div className="col-sm-9">{this.state.eachgroup.privacy}</div></div><br/>
              <div className="row"><div className="col-sm-2">Events</div><div className="col-sm-1">:</div><div className="col-sm-9">{this.state.eachgroup.events}</div></div><br/>
              <div className="row"><div className="col-sm-2">Posts</div><div className="col-sm-1">:</div><div className="col-sm-9">{this.state.eachgroup.posts}</div></div><br/>
              <div className="row"><div className="col-sm-2">Members</div><div className="col-sm-1">:</div><div className="col-sm-9" ><div className="row"><div className="col-sm-6" style={{height:"300px",overflow:"scroll"}}>{this.state.eachgroup.members.map((member,index)=>{
                  return <li key={index}>{member.bio.firstName} {member.bio.lastName}</li>
                            })  }
                </div></div></div></div>
                <div className="row"><div className="col-sm-2">
                <Link to={`/groups/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link></div>
                <div className="col-sm-2">
                <Link to={{pathname:`/groups/edit/${this.props.match.params.id}`,state:{group:this.state.eachgroup,allEmployees:this.state.allEmployees}}} >Edit</Link></div>
                <div className="col-sm-2">
                <Link to="/groups">back</Link></div></div>
            </div>
        )
    }
}


export default EachGroup;