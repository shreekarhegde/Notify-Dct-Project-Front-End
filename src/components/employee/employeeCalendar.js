import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './employeeCalendar.css'

const localizer = BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
                end: new Date(activity.schedule.date)
            }
        })
    }

    createEventsArray(){
        this.state.newActivities.push(this.createEventObject());
    }


    render(){
        this.createEventsArray();
        return(
            <div>
                <BigCalendar className="calendar"
                    localizer={localizer}
                    events={this.state.newActivities[0]}
                    views={allViews}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
    
        )
    }
}


export default MyCalendar;