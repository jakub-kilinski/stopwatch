class Driver {
    times = [];
    currentLap = 0;
    joker = false;
    startLapTime = 0;
    finished = false;

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

    setFinished() {
       this.finished = true;
    }

    getFinished() {
        return this.finished;
    }
}

export default Driver;