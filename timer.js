class Timer {
    constructor(timer_length, continue_time = 0) {
        this.reverse_mode = false;
        this.running = false;

        this.timer_length = timer_length;
        this.continue_time = continue_time;
        this.start_time = Date.now();
    }

    start() {
        if (this.running) return;
        this.start_time = Date.now();
        this.running = true;
    }

    stop() {
        if (!this.running) return;
        this.continue_time = this.getElapsedTime();
        this.running = false;
    }

    reset() {
        this.start_time = Date.now();
    }

    reverse(clamp = true) {
        this.continue_time = this.getElapsedTime(clamp);
        this.reverse_mode = !this.reverse_mode;
        this.start_time = Date.now();
    }

    setTimerLength(Timer_length) {
        this.timer_length = Timer_length;
    }

    setElapsedTime(Continue_time) {
        this.continue_time = Continue_time;
    }

    getRunning() {
        return this.running;
    }

    getReverse() {
        return this.reverse_mode;
    }

    getCompleat() {
        if (this.reverse_mode) {
            if (this.getElapsedTime() < 0) {
                return true;
            }
        } else {
            if (this.getElapsedTime() > this.timer_length) {
                return true;
            }
        }

        return false;
    }

    getTimerLength() {
        return this.timer_length;
    }

    getElapsedTime(clamp = false) {
        if (!this.running) this.start_time = Date.now();

        if (this.reverse_mode) {
            if (clamp) {
                if (this.continue_time - (Date.now() - this.start_time) < 0) {
                    return 0;
                } else {
                    return this.continue_time - (Date.now() - this.start_time);
                }
            } else {
                return this.continue_time - (Date.now() - this.start_time);
            }
        } else {
            if (clamp) {
                if (
                    Date.now() - this.start_time + this.continue_time >
                    this.getTimerLength()
                ) {
                    return this.getTimerLength();
                } else {
                    return Date.now() - this.start_time + this.continue_time;
                }
            } else {
                return Date.now() - this.start_time + this.continue_time;
            }
        }
    }

    getProgress(clamp = true) {
        let rate = this.getElapsedTime(clamp) / this.getTimerLength();

        return rate;
    }
}
