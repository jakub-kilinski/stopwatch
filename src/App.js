import React, {Component} from 'react';
import './App.scss';
import Stopwatch from './Stopwatch';
import SettingsPanel from "./SettingsPanel";

class App extends Component {
    constructor() {
        super();
        this.state = {
            settings: {
                drivers: [
                    {
                        lapButton: 49,
                        jokerButton: 81
                    },
                    {
                        lapButton: 50,
                        jokerButton: 87
                    },
                    {
                        lapButton: 51,
                        jokerButton: 69
                    },
                    {
                        lapButton: 52,
                        jokerButton: 82
                    },
                    {
                        lapButton: 53,
                        jokerButton: 84
                    },
                    {
                        lapButton: 54,
                        jokerButton: 89
                    },
                ],
                resetButton: 88,
                startButton: 13
            }
        }
    };

    render() {
        return (
            <>
                <div className="container">
                    <Stopwatch
                        settings={this.state.settings}
                    />
                </div>
                <SettingsPanel
                    settings={this.state.settings}
                />
            </>
        );
    }
}


export default App;
