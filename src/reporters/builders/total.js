'use strict';

module.exports = totalBuilder;

function totalBuilder() {
  return function build(stats) {
    if (stats.specCount < 1) {
      return [{ text: 'No specs found', options: { color: 'yellow' } }];
    }

    /**
     * @type {{options?: {color?: string, newLine?: boolean}, text: string}[]}
     */
    const data = [
      { text: `${stats.passedCount} passed`, options: { color: 'green' } },
    ];

    if (stats.failedCount) {
      data.push({ text: ', ' });
      data.push({
        text: `${stats.failedCount} failed`,
        options: { color: 'red' },
      });
    }

    if (stats.pendingCount) {
      data.push({ text: ', ' });
      data.push({
        text: `${stats.pendingCount} pending`,
        options: { color: 'cyan' },
      });
    }

    data.push({ text: ` (${stats.elapsed})`, options: { newLine: true } });

    return data;
  };
}
