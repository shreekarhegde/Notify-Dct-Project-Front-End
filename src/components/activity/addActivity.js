import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class AddActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTitle: ``,
            titleError: ``,
            aboutActivity: ``,
            aboutError:   ``,
            participants: [],
            participantsError: ``,
            department: [],
            departmentError: ``,
            time: ``,
            timeError: ``,
            venue: ``,
            venueError: ``,
            date: ``,
            dateError: ``,
            guests: [],
            employees: [],
            redirect: false,
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

        if(this.state.participants.length < 1){
            isError = true;
            console.log("error from participants")
            errors.participantsError = 'add atleast one participants';
        }

        if(this.state.date.length < 1){
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
        this.state.participants.push(event.target.value)
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
                participants: this.state.participants,
                guest: this.state.guests,
                schedule: {
                    time: this.state.time,
                    date: this.state.date
                },
                venue: this.state.venue,
                about: this.state.aboutActivity
            }
            console.log(submitValue, "submit value");
            axios.post(`http://localhost:3001/activities`, submitValue).then((response) => {
                console.log(response.data, "from axios post");
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
            <div>
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
                        <input type="number" name="time" onChange={this.handleTime} value={this.state.time}/><br/>
                    </label>
                    <label>Venue:<br/>
                        <input type="text" name="venue" onChange={this.handleVenue} value={this.state.venue}/><br/>
                    </label>
                    <label>Date:<br/>
                        <input type="date" name="date" onChange={this.handleDate} value={this.state.date}/><br/>
                    </label>
                    <label>Add participants: <br/> 
                    { <div>
                        {this.state.employees.map((employee, index) => {
                            return <div key={index}><input key={index} onClick={this.handleParticipants} type="checkbox" value={employee._id}/>{employee.firstName}</div>
                        })}
                    </div> }   
                    </label><span>{this.state.participantsError}</span>
                    <input type="submit" value="submit"></input>
                </form>
            </div>
        )
    }
}

export default AddActivity;

