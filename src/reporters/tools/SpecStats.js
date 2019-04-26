'use strict';

const Timer = require('./Timer');

class SpecStats {
  constructor() {
    this.timer = new Timer();

    this.specCount = 0;

    this.failedSpecs = [];
    this.failedSuites = [];
    this.pendingSpecs = [];
  }

  get failedCount() {
    return this.failedSpecs.length + this.failedSuites.length;
  }

  get passedCount() {
    return this.specCount - this.failedCount - this.pendingCount;
  }

  get pendingCount() {
    return this.pendingSpecs.length;
  }

  get elapsed() {
    return this.timer.getElapsed();
  }

  stopTimer() {
    this.timer.stop();
  }
}

module.exports = SpecStats;
