import React, {Component} from 'react';
import './App.scss';
import Stopwatch from './Stopwatch';
import SettingsPanel from "./SettingsPanel";
import Driver from "./Driver";

class App extends Component {
    constructor() {
        super();
        this.state = {
            "settings": {
                "drivers": [
                    {
                        "lapButton": "Digit1",
                        "jokerButton": "KeyQ"
                    },
                    {
                        "lapButton": "Digit2",
                        "jokerButton": "KeyW"
                    },
                    {
                        "lapButton": "Digit3",
                        "jokerButton": "KeyE"
                    },
                    {
                        "lapButton": "Digit4",
                        "jokerButton": "KeyR"
                    },
                    {
                        "lapButton": "Digit5",
                        "jokerButton": "KeyT"
                    },
                    {
                        "lapButton": "Digit6",
                        "jokerButton": "KeyY"
                    },
                ],
                "resetButton": "KeyX",
                "startButton": "Enter"
            },
            "configuration": {
                "lapsNumber": 2,
                "driversNumber": 3,
                "jokerPenaltyMilliseconds": 45000
            },
            "drivers": {}
        }
    };

    componentDidMount() {
        this.setState({
            drivers: this.initializeDriversAndTimeTable()
        });
    };

    initializeDriversAndTimeTable() {
        let driver = [];
        for (let i = 0; i < this.state.configuration.driversNumber; i++) {
            driver.push(new Driver(this.state.configuration.lapsNumber));
        }
        return driver;
    };

    updateConfiguration = (option, value) => {
        let configuration = Object.assign({}, this.state.configuration);
        configuration[option] = Number(value);
        this.setState({
            configuration: configuration,
            drivers: this.initializeDriversAndTimeTable()
        });
    };

    updateKeyConfiguration = (dataSet, newKey) => {
        let buttonType = dataSet.buttontype;
        let settings = Object.assign({}, this.state.settings);
        if (buttonType === 'lap' || buttonType === 'joker') {
            let driverIndex = Number(dataSet.drivernumber);
            for (let i = 0, count = settings.drivers.length; i < count; i++) {
                if (i === driverIndex) {
                    settings.drivers[i][buttonType + 'Button'] = newKey;
                    break;
                }
            }
            this.setState({
                settings: settings
            });
            return;
        }
        settings[buttonType + 'Button'] = newKey;
        this.setState({
            settings: settings
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <Stopwatch
                        settings={this.state.settings}
                        configuration={this.state.configuration}
                    />
                </div>
                <SettingsPanel
                    settings={this.state.settings}
                    configuration={this.state.configuration}
                    updateConfiguration={this.updateConfiguration}
                    updateKeyConfiguration={this.updateKeyConfiguration}
                />
            </>
        );
    }
}


export default App;
