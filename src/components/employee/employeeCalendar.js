import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class MyCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activities: this.props.activities,
            newActivities: [],
        }
    }

    createEventObject(){
        return this.state.activities.map((activity) => {
            return {
                id: activity._id,
                title: activity.activityName,
                allDay: true,
                start: new Date(activity.schedule.date),
                // start: new Date(),
                end: new Date()
            }
        })
    }

    createEventsArray(){
        this.state.newActivities.push(this.createEventObject());
    }


    render(){
        this.createEventsArray();
        return(
            <div>{console.log(this.state.newActivities[0], "new activities")}
                <BigCalendar
                    localizer={localizer}
                    events={this.state.newActivities[0]}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
    
        )
    }
}


export default MyCalendar;