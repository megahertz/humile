'use strict';

const { timeMs } = require('./format');

class Timer {
  constructor() {
    this.start();
  }

  start() {
    this.startedTime = new Date();
  }

  stop() {
    if (!this.stoppedTime) {
      this.stoppedTime = new Date();
    }

    return this.stoppedTime;
  }

  getElapsed() {
    return timeMs(this.stop() - this.startedTime);
  }
}

module.exports = Timer;
