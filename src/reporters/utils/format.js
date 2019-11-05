'use strict';

module.exports = {
  timeMs(time, secondsIfGreater = 5000) {
    if (secondsIfGreater && time < secondsIfGreater) {
      return time + 'ms';
    }

    return (Math.round(time / 10) / 100) + 's';
  },
};
