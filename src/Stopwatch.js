import React, {Component} from "react";
import Driver from './Driver';

class Stopwatch extends Component {
    config = {
        numbersOfDrivers: 4,
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
            drivers: this.initializeDriversAndTimeTable(),
            finish: false,
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

    initializeDriversAndTimeTable() {
        let driver = [];
        for (let i = 0; i < this.config.numbersOfDrivers; i++) {
            driver.push(new Driver(this.config.laps));
        }
        return driver;
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
    saveLapTime = (driverNumber) => {
        let driver = this.state.drivers[driverNumber];
        if(driver.currentLap < this.config.laps){
            let time = driver.getStartLapTime()
                ? new Date(Date.now() - driver.getStartLapTime())
                : new Date(Date.now() - this.state.startTime);
            driver.putLapTime(time);
        }
        if (driver.currentLap === this.config.laps) {
            driver.setFinished();
        }
        if (this.isFinished()) {
            this.runTimer();
            this.setState({
                finish: true
            });
        }
    };
    isFinished(){
        return this.state.drivers.every(function (element) {
            return element.getFinished() === true;
        });
    }
    setJokerLap = (driverNumber) => {
        let driver = this.state.drivers[driverNumber];
        driver.setJoker();
    };
    recognizeKey = (event) => {
        let keyCode = event.keyCode;
        if (keyCode === this.KEYS.start) {
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
                drivers: this.initializeDriversAndTimeTable(),
                finish: false
            });
        }
    };

    getStatusMessage() {
        if(this.state.finish){
            return "koniec wyścigu";
        }
        if (!this.state.finish && this.state.isRunning) {
            return "wyścig trwa";
        }
        return "oczekiwanie na start";
    }

    renderDriver = (data, id) => {
        return (
            <div key={id} className="driver">
                <span>{id}: </span><span>joker: {this.renderJoker(data.getJoker())} </span>{data.times.map(this.renderTime)}
            </div>
        );
    };

    renderJoker = (state) => {
        let clazzName = "joker " +  (state ? 'passed' : 'not-passed');
        return (
            <i className={clazzName}>
            </i>
        );
    }

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
            <span key={'t' + id} className="singleTime">{data ? this.renderPrettyTime(data) : "00:00:000"} </span>
        );
    };

    render() {
        let statusMessage = this.getStatusMessage();
        const {min, sec, ms} = this.state;
        return (
            <div>
                <div className="mainTimer">
                    <div className="time">
                        <p>Czas główny</p>
                        <p>{min ? min : '00'}:{sec ? sec : '00'}:{ms ? ms : '000'}</p>
                    </div>
                    <p className="statusMessage">{statusMessage}</p>
                </div>
                <ul className="driversList">
                    {this.state.drivers.map(this.renderDriver)}
                </ul>
            </div>
        );
    }
}

export default Stopwatch;