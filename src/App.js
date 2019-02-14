import React, {Component} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import Stopwatch from './Stopwatch';
import SettingsPanel from "./SettingsPanel";
import Configuration from "./Configuration";

class App extends Component {
    constructor() {
        super();
        this.state = this.initializeState();
        this.stopwatch = React.createRef();
        this.updateConfiguration = this.updateConfiguration.bind(this);
        library.add(faCogs);
    };

    componentDidUpdate() {
        localStorage.setItem("state", JSON.stringify(this.state));
    };

    initializeState() {
        let defaultState = {
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
            "isActiveConfigurationPanel" : false
        };

        if(localStorage.getItem("state") === null) {
            return defaultState;
        }
        return JSON.parse(localStorage.getItem("state"));
    }

    updateConfiguration = (option, value) => {
        let configuration = Object.assign({}, this.state.configuration);
        configuration[option] = Number(value);
        this.setState({
            configuration: configuration
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

    showConfigurationPanel = () => {
        this.setState({
            isActiveConfigurationPanel : !this.state.isActiveConfigurationPanel
        });
    };

    render() {
        let configurationPanelclazz = "configurationPanel " + (this.state.isActiveConfigurationPanel ? "active" : "");
        let configBoxclazz = "configBox " + (this.state.isActiveConfigurationPanel ? "active" : "");
        return (
            <>
                <div className="container">
                    <Stopwatch
                        ref={this.stopwatch}
                        settings={this.state.settings}
                        configuration={this.state.configuration}
                    />
                </div>
                <div className={configurationPanelclazz}>
                    <SettingsPanel
                        settings={this.state.settings}
                        configuration={this.state.configuration}
                        updateConfiguration={this.updateConfiguration}
                        updateKeyConfiguration={this.updateKeyConfiguration}
                    />
                    <Configuration
                        updateConfiguration={this.updateConfiguration}
                        configuration={this.state.configuration}
                    />
                </div>
                <div className={configBoxclazz} onClick={this.showConfigurationPanel}>
                    <FontAwesomeIcon icon="cogs" />
                </div>
            </>
        );
    }
}


export default App;
