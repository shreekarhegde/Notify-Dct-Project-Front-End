import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';    

class Activity extends React.Component {
    constructor(){
        super();
        this.state = {
            activities: [],
            employees: [],
            departments: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/activities`).then((responseFromActivities) => {
            console.log(responseFromActivities.data, "activity");
            this.setState({
                activities: responseFromActivities.data,
            })
        })
        axios.get(`http://localhost:3001/employees`).then((responseFromEmployees) => {
            console.log(responseFromEmployees.data, "employees");
            this.setState({
                employees: responseFromEmployees.data
            })
        })
        axios.get(`http://localhost:3001/departments`).then((responseFromDepartments) => {
            console.log(responseFromDepartments.data, "departments");
            this.setState({
                departments: responseFromDepartments.data
            })
        })
    }

   render(){
       return(
           <div>
               {this.state.activities.map((activity, index) => (
                   <li key={index}>
                        <Link to={{pathname:`/activities/${activity._id}`, state: {activity: activity, employees: this.state.employees, departments: this.state.departments}}}>{activity.activityName}</Link>
                   </li> 
               ))}

                <Link to={{pathname:"/activities/new",state: {employees: this.state.employees, departments: this.state.departments}}}>Create New Activity</Link>

           </div>
       )
   }
}

export default Activity;