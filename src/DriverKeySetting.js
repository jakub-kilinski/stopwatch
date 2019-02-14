import React, {Component} from "react";
import DriverSingleSetting from './DriverSingleSetting.js';

class DriverKeySetting extends Component {
    render(){
        return (
            <div key={this.props.index} className="driverConfigWrapper">
                <div className="driverHeader">Driver {this.props.index + 1}</div>
                <div className="driverInputs">
                    <DriverSingleSetting
                        optionType="Lap"
                        placeholder={this.props.driver.lapButton}
                        buttontype="lap"
                        driverIndex={this.props.index}
                        onFocusChangeKey={this.props.onFocusChangeKey}
                    />
                    <DriverSingleSetting
                        optionType="Joker"
                        placeholder={this.props.driver.jokerButton}
                        buttontype="joker"
                        driverIndex={this.props.index}
                        onFocusChangeKey={this.props.onFocusChangeKey}
                    />
                </div>

            </div>);
    };
}

export default DriverKeySetting;