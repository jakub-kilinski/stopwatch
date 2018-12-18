import React, {Component} from "react";
import Driver from './Driver';

class Stopwatch extends Component {
    config = {
        numbersOfDrivers: 4,
        laps: 6,
        jokerPenaltyMilliseconds: 45000
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
            ms: 0,
            bestTime: 0
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
        if (driver.currentLap < this.config.laps) {
            let time = driver.getStartLapTime()
                ? new Date(Date.now() - driver.getStartLapTime())
                : new Date(Date.now() - this.state.startTime);
            driver.putLapTime(time);
            if (this.state.bestTime > time || this.state.bestTime === 0) {
                this.setState({
                    bestTime: time
                });
            }
        }
        if (driver.currentLap === this.config.laps) {
            driver.setFinished();
        }
        if (this.isFinished()) {
            this.runTimer();
            this.showBestTime();
            this.setState({
                finish: true
            });
        }
    };

    showBestTime() {
        let bestTime = this.state.bestTime;

        this.state.drivers.map(function(driver){
            driver.times.map(function(time){
                if(time.time === bestTime){
                    time.best = true;
                }
                return time;
            });
            return driver;
        });
    };

    isFinished() {
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
        if (keyCode === this.KEYS.start && !this.state.finish) {
            this.runTimer();
        } else if (keyCode === this.KEYS.x) {
            this.handleReset();
        }
        if (this.state.isRunning && !this.state.finish) {
            if (keyCode === this.KEYS.n1 && this.config.numbersOfDrivers >= 1) {
                this.saveLapTime(0);
            } else if (keyCode === this.KEYS.n2 && this.config.numbersOfDrivers >= 2) {
                this.saveLapTime(1);
            } else if (keyCode === this.KEYS.n3 && this.config.numbersOfDrivers >= 3) {
                this.saveLapTime(2);
            } else if (keyCode === this.KEYS.n4 && this.config.numbersOfDrivers >= 4) {
                this.saveLapTime(3);
            } else if (keyCode === this.KEYS.q && this.config.numbersOfDrivers >= 1) {
                this.setJokerLap(0);
            } else if (keyCode === this.KEYS.w && this.config.numbersOfDrivers >= 2) {
                this.setJokerLap(1);
            } else if (keyCode === this.KEYS.e && this.config.numbersOfDrivers >= 3) {
                this.setJokerLap(2);
            } else if (keyCode === this.KEYS.r && this.config.numbersOfDrivers >= 4) {
                this.setJokerLap(3);
            }
        }
    };
    handleReset = () => {
        if (!this.state.isRunning) {
            clearInterval(this.timer);
            this.setState({
                min: 0,
                sec: 0,
                ms: 0,
                isRunning: false,
                startTime: 0,
                runningTime: 0,
                drivers: this.initializeDriversAndTimeTable(),
                finish: false,
                bestTime: 0
            });
        }
    };

    getStatusMessage() {
        if (this.state.finish) {
            return "koniec wyścigu";
        }
        if (!this.state.finish && this.state.isRunning) {
            return "wyścig trwa";
        }
        return "oczekiwanie na start";
    }
    renderTotalTime = (driver) => {
        if (driver.getFinished()) {
            let totalTime = 0;
            driver.times.map(function(time){
                return totalTime += time.time.getTime();
            });
            if(!driver.getJoker()){
                totalTime += this.config.jokerPenaltyMilliseconds;
                return (
                    <>
                        {this.renderDigits(new Date(totalTime))} {this.renderPenaltyPlaceholder()}
                    </>
                );
            }
            return this.renderDigits(new Date(totalTime));
        }
        return Stopwatch.renderTimePlaceholder();
    };

    renderDriver = (data, id) => {
        return (
            <tr key={id} className="driver">
                <td>{++id}.</td>
                <td>{this.renderJoker(data.getJoker())} </td>
                {data.times.map(this.renderTime)}
                <td className="totalTime">{this.renderTotalTime(data)}</td>
            </tr>
        );
    };

    renderJoker = (state) => {
        let clazzName = "joker " + (state ? 'passed' : 'not-passed');
        return (
            <i className={clazzName}>
            </i>
        );
    };
    renderPrettyTime = (time) => {
        let clazzName = 'prettyTime' + (time.best ? " best" : "");
        return (
            <span className={clazzName}>
                {this.renderDigits(time.time)}
            </span>
        );
    };
    renderDigits = (time) => {
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
            <td key={'t' + id} className="singleTime">{data.time ? this.renderPrettyTime(data) : Stopwatch.renderTimePlaceholder()} </td>
        );
    };

    static renderTimePlaceholder() {
        return (
            <span className="timePlaceholder">
                00:00:000
            </span>
        );
    };

    renderPenaltyPlaceholder() {
        return (
            <span className="jokerPenalty">
                (+{new Date(this.config.jokerPenaltyMilliseconds).getSeconds()}s)
            </span>
        )
    }

    renderLapHeader = () => {
        let table = [];
        for (let i = 0; i < this.config.laps; i++) {
            table.push(<th className="timeHeader" key={'th' + i}>
                okr. {i + 1}.
            </th>);
        }
        return table;
    };

    render() {
        let statusMessage = this.getStatusMessage();
        let statusMessageClass = 'statusMessage' + (this.state.finish ? '--finished' : "");
        const {min, sec, ms} = this.state;
        return (
            <div>
                <div className="mainTimer">
                    <div className="time">
                        <p>Czas główny</p>
                        <p>{min ? min : '00'}:{sec ? sec : '00'}:{ms ? ms : '000'}</p>
                    </div>
                    <p className={statusMessageClass}>{statusMessage}</p>
                </div>
                <table className="driversList">
                    <tbody>
                        <tr>
                            <th>zawodnicy</th>
                            <th>joker</th>
                            {this.renderLapHeader()}
                            <th className="totalTimeHeader">łączny czas</th>
                        </tr>

                        {this.state.drivers.map(this.renderDriver)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stopwatch;