import React, {Component} from "react";

class SettingsPanel extends Component {
    renderEditButton = (driver, index) => {

    };
    renderDriversSettings(){
        return (
            <div>
                <p>{this.props.settings.drivers.map(function(driver, index){
                    return (<span key={index}>{index}<br/>Lap button: {driver.lapButton}, Joker button: {driver.jokerButton}<br/></span>);
                })}</p>
                <p>Reset button: {this.props.settings.resetButton}</p>
                <p>Start button: {this.props.settings.startButton}</p>
            </div>
        );
    }

    render(){
        return (
            <div>
                <h1>Hello</h1>
                {this.renderDriversSettings()}
            </div>
        );
    }
}

export default SettingsPanel;
