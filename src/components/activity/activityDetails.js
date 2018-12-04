import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class ActivityDetails extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                activityDetails: this.props.location.state.activity,
                employees: this.props.location.state.employees,
                departments: this.props.location.state.departments,
                redirect: false
            }
            this.deleteHandle = this.deleteHandle.bind(this);
        }    

        deleteHandle() {
            axios.delete(`http://localhost:3001/activities/${this.props.match.params.id}`).then((response) => {
                console.log(response);
                this.setState({
                    redirect: true
                })
            })
        }

        render() {
            const {redirect} = this.state;
            if(redirect){
                return <Redirect to="/activities" exact/>
            }

            return (
                <div>{console.log(this.props.location.state, "from state")}
                    <h1>{this.state.activityDetails.activityName}</h1>
                    <p>{this.state.activityDetails.about}</p>
                    <b>on</b>
                    <h5>{this.state.activityDetails.schedule.date}</h5>
                    <b>at</b>
                    <h5>{this.state.activityDetails.schedule.time}</h5>
                    <b>venue</b>
                    <h5>{this.state.activityDetails.venue}</h5>
                    <b>Cheif Guest(s)</b>
                    <h4>{this.state.activityDetails.guests.map((guest,index) => {
                        return <li key={index}>{guest}</li>
                    })}</h4>

                    <Link to={{pathname: `/activities/edit/${this.props.match.params.id}`, state: {activityDetails: this.state.activityDetails, employees: this.state.employees, departments: this.state.departments}}}>Edit</Link><br/>


                    <Link to="/activities">back</Link><br/>

                    <button onClick={this.deleteHandle}>delete this activity</button>

                </div>
            )
        }
}

export default ActivityDetails;

