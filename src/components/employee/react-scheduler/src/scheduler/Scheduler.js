import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";

class Scheduler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: "2018-05-01",
            days: 31,
            scale: "Day",
            timeHeaders: [

                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}

            ],
            cellWidthSpec: "Auto",
            eventHeight:30,
            cellWidth: 50,
            resources: [
                {name: "Resource A", id: "A"},
                {name: "Resource B", id: "B"},
                {name: "Resource C", id: "C"},
                {name: "Resource D", id: "D"},
                {name: "Resource E", id: "E"},
                {name: "Resource F", id: "F"},
                {name: "Resource G", id: "G"}
            ],
            events: [
                {id: 1, text: "Event 1", start: "2018-05-02T00:00:00", end: "2018-05-05T00:00:00", resource: "A" },
                {id: 2, text: "Event 2", start: "2018-05-03T00:00:00", end: "2018-05-10T00:00:00", resource: "C", barColor: "#38761d", barBackColor: "#93c47d" },
                {id: 3, text: "Event 3", start: "2018-05-02T00:00:00", end: "2018-05-08T00:00:00", resource: "D", barColor: "#f1c232", barBackColor: "#f1c232" },
                {id: 3, text: "Event 3", start: "2018-05-02T00:00:00", end: "2018-05-08T00:00:00", resource: "E", barColor: "#cc0000", barBackColor: "#ea9999" }
            ]
        };
    }

    zoomChange(args) {
        switch (args.level) {
            case "month":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfMonth(),
                    days: DayPilot.Date.today().daysInMonth(),
                    scale: "Day"
                });
                break;
            case "week":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfWeek(),
                    days: 7,
                    scale: "Day"
                });
                break;
            default:
                throw new Error("Invalid zoom level");
        }
    }

    cellWidthChange(ev) {
        var checked = ev.target.checked;
        this.setState({
            cellWidthSpec: checked ? "Auto" : "Fixed"
        });
    }

    render() {
        var {...config} = this.state;
        return (
            <div>
                <Zoom onChange={args => this.zoomChange(args)} />
                <div className="space"><label><input type="checkbox" checked={this.state.cellWidthSpec === "Auto"} onChange={ev => this.cellWidthChange(ev)} /> Auto width</label></div>
                <DayPilotScheduler
                    {...config}
                    onEventMoved={args => {
                        console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
                        this.scheduler.message("Event moved: " + args.e.data.text);
                    }}
                    ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;
