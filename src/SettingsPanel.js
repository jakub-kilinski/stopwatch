import React, {Component} from "react";

class SettingsPanel extends Component {

    handleUpdateLapConfiguration = (event) => {
        this.props.updateConfiguration('lapsNumber', event.target.value);
    };

    onFocusChangeKey = (event) => {
        let currentElement = event.currentTarget;
        let dataSet = currentElement.dataset;
        console.log(event);
        currentElement.onkeydown = this.onKeyDownChangeKeyConfiguration.bind(null, currentElement, dataSet, this.props);
    };

    onKeyDownChangeKeyConfiguration(currentElement, dataSet, props, event){
        event.preventDefault();
        console.log(event);
        currentElement.blur();
        props.updateKeyConfiguration(dataSet, event.code)
    };

    renderRaceConfiguration() {
        return (
            <div>
                <p>Drivers: {this.props.configuration.driversNumber}</p>
                <p>Laps:
                    <input type="text" placeholder={this.props.configuration.lapsNumber} disabled="disabled"/>
                    <button onClick={this.handleUpdateLapConfiguration}>
                        Edit
                    </button>
                </p>
                <p>Penalty time: {this.props.configuration.jokerPenaltyMilliseconds}</p>
            </div>
        );
    }

    renderEditButton = (driver, index) => {
        return (
            <span key={index}>
                Driver {index + 1}
                <br/>Lap button: <input type="text" className="settingsInput" placeholder={driver.lapButton} data-buttontype="lap"
                                        data-drivernumber={index} onFocus={this.onFocusChangeKey}/>,
                Joker button: <input type="text" className="settingsInput" data-buttontype="joker" data-drivernumber={index}
                                     placeholder={driver.jokerButton}  onFocus={this.onFocusChangeKey}/><br/>
            </span>);
    };

    renderDriversSettings() {
        return (
            <div>
                <p>{this.props.settings.drivers.map(this.renderEditButton)}</p>
                <p>Reset button: <input type="text" className="settingsInput" placeholder={this.props.settings.resetButton} data-buttontype="reset"
                                        onFocus={this.onFocusChangeKey}/></p>
                <p>Start button: <input type="text" className="settingsInput" placeholder={this.props.settings.startButton} data-buttontype="start"
                                        onFocus={this.onFocusChangeKey}/></p>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderDriversSettings()}
                {this.renderRaceConfiguration()}

            </div>
        );
    }
}

class Configuration extends Component {

}

export default SettingsPanel;
