import React, {Component} from "react";
import DriverKeySetting from "./DriverKeySetting.js";

class SettingsPanel extends Component {

    onFocusChangeKey = (event) => {
        let currentElement = event.currentTarget;
        let dataSet = currentElement.dataset;
        currentElement.onkeydown = this.onKeyDownChangeKeyConfiguration.bind(null, currentElement, dataSet, this.props);
    };

    onKeyDownChangeKeyConfiguration(currentElement, dataSet, props, event){
        event.preventDefault();
        currentElement.blur();
        props.updateKeyConfiguration(dataSet, event.code)
    };

    renderEditButton = (driver, index) => {
        return (
            <DriverKeySetting
                key={index}
                driver={driver}
                index={index}
                onFocusChangeKey={this.onFocusChangeKey}
            />
        );
    };

    renderDriversSettings() {
        return (
            <div>
                <div>{this.props.settings.drivers.map(this.renderEditButton)}</div>
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
            </div>
        );
    }
}

export default SettingsPanel;
