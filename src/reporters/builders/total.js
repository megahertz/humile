'use strict';

module.exports = totalBuilder;

function totalBuilder() {
  return function build(stats) {
    if (stats.specCount < 1) {
      return [];
    }

    /**
     * @type {{options?: {color?: string, newLine?: boolean}, text: string}[]}
     */
    const data = [
      { text: `${stats.passedCount} passed`, color: 'green' },
    ];

    if (stats.failedCount) {
      data.push({ text: ', ' });
      data.push({ text: `${stats.failedCount} failed`, color: 'red' });
    }

    if (stats.pendingCount) {
      data.push({ text: ', ' });
      data.push({ text: `${stats.pendingCount} pending`, color: 'cyan' });
    }

    data.push({ text: ` (${stats.elapsed})`, newLine: true });

    return data;
  };
}
