'use strict';

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
    const diff = this.stop() - this.startedTime;

    if (diff < 5000) {
      return diff + 'ms';
    }

    return (Math.round(diff / 10) / 100) + 's';
  }
}

module.exports = Timer;
