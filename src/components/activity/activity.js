import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';    

class Activity extends React.Component {
    constructor(){
        super();
        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/activities`).then((response) => {
            console.log(response.data, "data");
            this.setState({
                activities: response.data
            })
        })
    }

   render(){
       return(
           <div>
               {this.state.activities.map((activity, index) => (
                   <li key={index}>
                        <Link to={{pathname:`/activities/${activity._id}`, state: {activity: activity}}}>{activity.activityName}</Link>
                   </li> 
               ))}
           </div>
       )
   }
}

export default Activity;