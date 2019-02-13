import React, {Component} from "react";
import SingleConfiguration from "./SingleConfiguration.js";

class Configuration extends Component {
    render(){
        return (
            <div className="configurationWrapper">
                <SingleConfiguration
                    fieldName="Number of drivers"
                    value={1}
                />
                <SingleConfiguration
                    fieldName="Number of laps"
                    value={2}
                />
                <SingleConfiguration
                    fieldName="Penalty time in ms"
                    value={3}
                />
            </div>
        );
    }
}

export default Configuration;