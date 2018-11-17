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


class Stopwatch extends Component {
    config = {
        numbersOfPlayers: 4,
        laps: 3
    };
    KEYS = {
        n1: 49,
        n2: 50,
        n3: 51,
        n4: 52,
        q: 81,
        w: 87,
        e: 69,
        r: 82,
        x: 88,
        space: 32
    };

    constructor() {
        super();
        this.state = {
            players: this.initializePlayersTime(),
            isRunning: false,
            runningTime: 0,
            min: 0,
            sec: 0,
            ms: 0
        }
    }

    componentDidMount() {
        console.log('dupa');
        document.body.addEventListener('keydown', this.recognizeKey);
    };

    initializePlayersTime() {
        let players = [];
        for(let i=0; i<this.config.numbersOfPlayers; i++){
            players.push([]);
            for(let j=0; j<this.config.laps; j++){
                players[i].push(0);
            }
        }
        return players;
    };

    runTimer = () => {
        this.setState(state => {
            if (state.isRunning) {
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
            return {isRunning: !state.isRunning};
        });
    };
    recognizeKey = (event) => {
        let keyCode = event.keyCode;
        if (keyCode === this.KEYS.space) {
            console.log('space');
            this.runTimer();
        } else if (keyCode === this.KEYS.n1) {
            console.log('1');
        } else if (keyCode === this.KEYS.n2) {
            console.log('2');
        } else if (keyCode === this.KEYS.n3) {
            console.log('3');
        } else if (keyCode === this.KEYS.n4) {
            console.log('4');
        } else if (keyCode === this.KEYS.q) {
            console.log('q');
        } else if (keyCode === this.KEYS.w) {
            console.log('w');
        } else if (keyCode === this.KEYS.e) {
            console.log('e');
        } else if (keyCode === this.KEYS.r) {
            console.log('r');
        } else if (keyCode === this.KEYS.x) {
            this.handleReset();
        }
    };
    handleReset = () => {
        clearInterval(this.timer);
        this.setState({
            runningTime: 0,
            min: 0,
            sec: 0,
            ms: 0,
            isRunning: false
        });
    };

    renderPlayer = (data, id) => {
        return (
            <div key={id}>
                <span>{id}: </span>{data.map(this.renderTime)}
            </div>
        );
    };

    renderTime = (data, id) => {
        return (
            <span>{data ? data : "00:00:000"} </span>
        );
    };

    render() {
        const {runningTime, min, sec, ms} = this.state;
        return (
            <div>
                <p>{runningTime}ms</p>
                <p>{min}min {sec}s {ms}ms</p>
                <ul>
                    {this.state.players.map(this.renderPlayer)}
                </ul>
            </div>
        );
    }
}

export default App;
