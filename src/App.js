import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Stopwatch</h1>
                <Stopwatch/>
            </div>
        );
    }
}


class Stopwatch extends Component{
    KEYS = {
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        q: 81,
        w: 87,
        e: 69,
        r: 82,
        x: 88,
        space: 32
    };
    state = {
        status: false,
        runningTime: 0,
        min: 0,
        sec: 0,
        ms: 0
    };
    handleClick = () => {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timer);
            } else {
                const startTime = Date.now() - this.state.runningTime;
                this.timer = setInterval(() => {
                    let time = new Date(Date.now() - startTime);
                    this.setState({
                        runningTime: Date.now() - startTime,
                        min: time.getMinutes(),
                        sec: time.getSeconds(),
                        ms: time.getMilliseconds()
                    });
                });
            }
            return {status: !state.status};
        });
    };
    handleReset = () => {
        clearInterval(this.timer);
        this.setState({runningTime: 0, min: 0, sec: 0, running: false});
    };
    render(){
        const {status, runningTime, min, sec, ms} = this.state;
        return (
            <div tabIndex={0} onKeyDown={this.handleClick}>
                <p>{runningTime}ms</p>
                <p>{min}min {sec}s {ms}ms</p>
                <button>{status ? 'Stop' : 'Start'}</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export default App;
