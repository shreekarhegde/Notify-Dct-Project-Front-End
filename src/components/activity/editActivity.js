import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class EditActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTitle: this.props.location.state.activityDetails.activityName,
            titleError: ``,
            aboutActivity: this.props.location.state.activityDetails.about,
            aboutError:   ``,
            participants: this.props.location.state.activityDetails.participants,
            participantsError: ``,
            department: this.props.location.state.activityDetails.department,
            departmentError: ``,
            time: this.props.location.state.activityDetails.schedule.time,
            timeError: ``,
            venue: this.props.location.state.activityDetails.venue,
            venueError: ``,
            date: this.props.location.state.activityDetails.schedule.date,
            dateError: ``,
            guests: this.props.location.state.activityDetails.guests,
            employees: [],
            redirect: false,
            participantsToBeRemoved: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleActivityTitle = this.handleActivityTitle.bind(this);
        this.handleAboutActivity = this.handleAboutActivity.bind(this);
        this.handleDepartment = this.handleDepartment.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleVenue = this.handleVenue.bind(this);
        this.handleParticipants = this.handleParticipants.bind(this);
        this.handleGuests = this.handleGuests.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            titleError: ``,
            departmentError: ``,
            participantsError: ``,
            venueError: ``,
            dateError: ``,
            venueError: ``,
            timeError: ``
        }

        if(this.state.activityTitle.length < 3){
            isError = true;
            console.log("error from title")
            errors.titleError = 'title should be three characters long';
        }

        if(this.state.aboutActivity.length < 5){
            isError = true;
            console.log("error from title")
            errors.aboutError = 'say something about the activity in atleast 5 characters';
        }

        if(this.state.time.length < 1){
            isError = true;
            console.log("error from time")
            errors.timeError = 'please specify the time of the activity';
        }

        if(this.state.venue.length < 3){
            isError = true;
            console.log("error from venue")
            errors.venueError = 'please specify the venue of activity';
        }

        if(this.state.participants == ` `){
            isError = true;
            console.log("error from participants")
            errors.participantsError = 'add atleast one participants';
        }

        if(this.state.date == ``){
            console.log("error from date")
            isError = true;
            errors.dateError = 'specify the date of the activity';
        }

        this.setState({
            ...this.state,
            ...this.errors
        })

        return isError;
    }

    handleActivityTitle(event){
        event.preventDefault();
        console.log(event.target.value, "from title")
        this.setState({
            activityTitle: event.target.value
        })
    }
    handleAboutActivity(event){
        event.preventDefault();
        console.log(event.target.value, "from about")
        this.setState({
            aboutActivity: event.target.value
        })
    }
    handleTime(event){
        event.preventDefault();
        console.log(event.target.value, "from time")

        this.setState({
            time: event.target.value
        })
    }
    handleVenue(event){
        event.preventDefault();
        this.setState({
            venue: event.target.value
        })
    }
    handleDate(event){
        event.preventDefault();
        console.log(event.target.value, "from date")
        this.setState({
            date: event.target.value
        })
    }
    handleParticipants(event){
        console.log(event.target.value, "from participants")
        this.state.participantsToBeRemoved.push(event.target.value)
    }
    handleDepartment(event){
        event.preventDefault();
        console.log(event.target.value, "from department");
        this.setState({
            department: event.target.value
        })
    }
    handleGuests(event){
        event.preventDefault();
        console.log(event.target.value, "from guests")
        this.setState({
            guests: event.target.value
        })
    }

    handleSubmit(event){
        console.log(event.target.value);
        event.preventDefault();
        const err = this.validate();
        console.log(err, "err");
        if(!err){
            this.setState({
                titleError: ``,
                aboutError: ``,
                participantsError: ``,
                timeError: ``,
                venueError: ``,
                dateError: ``
            })

            let submitValue = {
                activityName: this.state.activityTitle,
                participantsToBeRemoved: this.state.participantsToBeRemoved,
                guest: this.state.guests,
                schedule: {
                    time: this.state.time,
                    date: this.state.date
                },
                venue: this.state.venue,
                about: this.state.aboutActivity,
                department: this.state.department
            }
            console.log(submitValue, "submit value");
            axios.put(`http://localhost:3001/activities/${this.props.match.params.id}`, submitValue).then((response) => {
                console.log(response.data, "from axios put");
                this.setState({
                    redirect: true
                })
            })
        }      
    }

    render(){
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to="/activities/" exact />
        }
        return(
            <div>{console.log(this.props.location.state.activityDetails.schedule.time, "time")}
                <form onSubmit={this.handleSubmit}>
                    <label>Title:<br/>
                        <input type="text" errortext={this.state.titleError} name="title" onChange={this.handleActivityTitle} value={this.state.activityTitle} /><br/>
                    </label><span>{this.state.titleError}</span>
                    <label>About:<br/>
                        <input type="text" errortext={this.state.aboutError} name="about" onChange={this.handleAboutActivity} value={this.state.aboutActivity}/><br/>
                    </label><span>{this.state.aboutError}</span>
                    <label>Guests:<br/>
                        <input type="text" name="guests" onChange={this.handleGuests} value={this.state.guests}/><br/>
                    </label>
                    <label>Time:<br/>
                        <input type="text" name="time" onChange={this.handleTime} value={this.state.time}/><br/>
                    </label>
                    <label>Venue:<br/>
                        <input type="text" name="venue" onChange={this.handleVenue} value={this.state.venue}/><br/>
                    </label>
                    <label>Date:<br/>
                        <input type="date" name="date" onChange={this.handleDate} value={this.state.date}/><br/>
                    </label>
                    <label>Remove participants: <br/> 
                    { <div>
                        {this.state.participants.map((participant, index) => {
                            return <div key={index}><input key={index} onClick={this.handleParticipants} type="checkbox" value={participant._id}/>{participant.bio.firstName}</div>
                        })}
                    </div> }   
                    </label><span>{this.state.participantsError}</span>
                    {/* <label>Remove department: <br/>
                    {<div>{console.log(this.props.location.state.activityDetails, "Department")}
                        {this.state.department.map((department, index) => {
                            return <div key={index}><input key={index} onClick={this.handleDepartment} type="checkbox" value={department._id}/>{department.departmentName}</div>
                        })}
                    </div>}

                    </label> */}
                    <input type="submit" value="submit"></input>
                </form>
            </div>
        )
    }
}

export default EditActivity;

