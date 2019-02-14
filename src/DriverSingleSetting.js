import React, {Component} from "react";


class DriverSingleSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: this.props.placeholder,
            tempPlaceholder: ""
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            placeholder: props.placeholder
        })
    }

    onInputFocus = (event) => {
        this.props.onFocusChangeKey(event);
        this.setState({
            tempPlaceholder: this.state.placeholder,
            placeholder: "Press key!"
        });
    };

    onTrustedBlur = (event) => {
        if(event.nativeEvent.sourceCapabilities !== null){
            this.setState({
                placeholder: this.state.tempPlaceholder
            });
        }
    };

    render() {
        return (
            <>
                <div>Lap button:
                    <input type="text" className="settingsInput lapInput"
                           placeholder={this.state.placeholder}
                           data-buttontype={this.props.buttontype}
                           data-drivernumber={this.props.driverIndex}
                           onFocus={this.onInputFocus}
                           onBlur={this.onTrustedBlur}
                    />
                </div>

            </>);
    };
}

export default DriverSingleSetting;