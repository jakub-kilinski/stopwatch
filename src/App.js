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

class Driver {
    times = [];
    currentLap = 0;
    joker = false;
    startLapTime = 0;

    constructor(numberOfLaps) {
        this.times = Driver.initTimes(numberOfLaps)
    }

    static initTimes(numberOfLaps) {
        let times = [];
        for (let j = 0; j < numberOfLaps; j++) {
            times.push(0);
        }
        return times;
    }

    increaseLapCounter() {
        this.currentLap++;
    }

    putLapTime(lapTime) {
        this.times[this.currentLap] = lapTime;
        this.startLapTime = Date.now();
        this.increaseLapCounter();
    }

    getStartLapTime() {
        return this.startLapTime;
    }

    setJoker() {
        this.joker = true;
    }

    getJoker() {
        return this.joker;
    }
}


class Stopwatch extends Component {
    config = {
        numbersOfPlayers: 4,
        laps: 5
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
        start: 13
    };

    constructor() {
        super();
        this.state = {
            players: this.initializePlayersTime(),
            isRunning: false,
            startTime: 0,
            runningTime: 0,
            min: 0,
            sec: 0,
            ms: 0
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.recognizeKey);
    };

    initializePlayersTime() {
        let players = [];
        for (let i = 0; i < this.config.numbersOfPlayers; i++) {
            players.push(new Driver(this.config.laps));
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
                        startTime: startTime,
                        runningTime: Date.now() - startTime,
                        min: ('0' + time.getMinutes()).slice(-2),
                        sec: ('0' + time.getSeconds()).slice(-2),
                        ms: ('00' + time.getMilliseconds()).slice(-3)
                    });
                });
            }
            return {isRunning: !state.isRunning};
        });
    };
    saveLapTime = (playerNumber) => {
        let player = this.state.players[playerNumber];
        if(player.currentLap < this.config.laps){
            let time = player.getStartLapTime()
                ? new Date(Date.now() - player.getStartLapTime())
                : new Date(Date.now() - this.state.startTime);
            player.putLapTime(time);
        }
    };
    setJokerLap = (playerNumber) => {
        let player = this.state.players[playerNumber];
        player.setJoker();
    };
    recognizeKey = (event) => {
        let keyCode = event.keyCode;
        if (keyCode === this.KEYS.start) {
            console.log('start');
            this.runTimer();
        } else if (keyCode === this.KEYS.x) {
            this.handleReset();
        }
        if(this.state.isRunning){
            if (keyCode === this.KEYS.n1) {
                this.saveLapTime(0);
            } else if (keyCode === this.KEYS.n2) {
                this.saveLapTime(1);
            } else if (keyCode === this.KEYS.n3) {
                this.saveLapTime(2);
            } else if (keyCode === this.KEYS.n4) {
                this.saveLapTime(3);
            } else if (keyCode === this.KEYS.q) {
                this.setJokerLap(0);
            } else if (keyCode === this.KEYS.w) {
                this.setJokerLap(1);
            } else if (keyCode === this.KEYS.e) {
                this.setJokerLap(2);
            } else if (keyCode === this.KEYS.r) {
                this.setJokerLap(3);
            }
        }
    };
    handleReset = () => {
        if(!this.state.isRunning){
            clearInterval(this.timer);
            this.setState({
                min: 0,
                sec: 0,
                ms: 0,
                isRunning: false,
                startTime: 0,
                runningTime: 0,
                players: this.initializePlayersTime()
            });
        }
    };

    renderPlayer = (data, id) => {
        return (
            <div key={id}>
                <span>{id}: </span><span>joker: {data.getJoker().toString()} </span>{data.times.map(this.renderTime)}
                <hr/>
            </div>
        );
    };

    renderPrettyTime = (time)  => {
        return (
            <>
                {('0' + time.getMinutes()).slice(-2)}:
                {('0' + time.getSeconds()).slice(-2)}:
                {('00' + time.getMilliseconds()).slice(-3)}
            </>
        );
    };
    renderTime = (data, id) => {
        return (
            <span key={'t' + id}>{data ? this.renderPrettyTime(data) : "00:00:000"} </span>
        );
    };

    render() {
        const {min, sec, ms} = this.state;
        return (
            <div>
                <p>{min ? min : '00'}min {sec ? sec : '00'}s {ms ? ms : '000'}ms</p>
                <ul>
                    {this.state.players.map(this.renderPlayer)}
                </ul>
            </div>
        );
    }
}

export default App;
