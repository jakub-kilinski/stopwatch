import React, {Component} from "react";
import SingleConfiguration from "./SingleConfiguration.js";

class Configuration extends Component {
    constructor(props){
        super(props);
        this.state = {
            inEdit: false
        };
        this.changeEditState = this.changeEditState.bind(this);
    };

    changeEditState = () => {
        this.setState({
            inEdit: !this.state.inEdit
        });
    };

    render(){
        return (
            <div className="configurationWrapper">
                <SingleConfiguration
                    fieldHeader="Number of drivers"
                    fieldName="driversNumber"
                    value={this.props.configuration.driversNumber}
                    changeEditState={this.changeEditState}
                    inEdit={this.state.inEdit}
                    updateConfiguration={this.props.updateConfiguration}
                />
                <SingleConfiguration
                    fieldHeader="Number of laps"
                    fieldName="lapsNumber"
                    value={this.props.configuration.lapsNumber}
                    changeEditState={this.changeEditState}
                    inEdit={this.state.inEdit}
                    updateConfiguration={this.props.updateConfiguration}
                />
                <SingleConfiguration
                    fieldHeader="Penalty time in ms"
                    fieldName="jokerPenaltyMilliseconds"
                    value={this.props.configuration.jokerPenaltyMilliseconds}
                    changeEditState={this.changeEditState}
                    inEdit={this.state.inEdit}
                    updateConfiguration={this.props.updateConfiguration}
                />
            </div>
        );
    }
}

export default Configuration;