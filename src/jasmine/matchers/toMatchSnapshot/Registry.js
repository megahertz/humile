'use strict';

const fs = require('fs');
const path = require('path');

class Registry {
  constructor(getSpecPathCallback) {
    if (typeof getSpecPathCallback !== 'function') {
      throw new Error('getSpecPathCallback should be a function');
    }

    this.getSpecPathCallback = getSpecPathCallback;
  }

  load(snapshotId) {
    const snapshots = this.readSnapshotFile();
    return snapshots[snapshotId];
  }

  readSnapshotFile(snapPath) {
    try {
      snapPath = snapPath || this.getSnapshotPath();

      if (!fs.existsSync(snapPath)) {
        return {};
      }

      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(snapPath);
    } catch (e) {
      return {};
    }
  }

  save(snapshotId, content) {
    const snapPath = this.getSnapshotPath();

    const snapshotsInFile = this.readSnapshotFile(snapPath);
    snapshotsInFile[snapshotId] = content;

    const fileContent = Object.entries(snapshotsInFile)
      .sort((a, b) => a[0] > b[0])
      .reduce((text, [id, value]) => {
        text = text ? `${text}\n` : '';

        const key = JSON.stringify(id);
        const data = JSON.stringify(value)
          .replace(/^"/, '')
          .replace(/"$/, '')
          .replace(/`/g, '\\`')
          .replace(/\\n/g, '\n');

        return `${text}exports[${key}] = \`${data}\`;\n`;
      }, '');

    this.ensureSnapshotDirExists(snapPath);
    fs.writeFileSync(snapPath, fileContent);
  }

  /**
   * @package
   */
  getSnapshotPath() {
    const specPath = this.getSpecPathCallback();

    return path.join(
      path.dirname(specPath),
      '__snapshots__',
      path.basename(specPath) + '.snap'
    );
  }

  /**
   * @package
   */
  purge() {
    try {
      fs.unlinkSync(this.getSnapshotPath());
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
  }

  /**
   * @private
   */
  ensureSnapshotDirExists(snapshotPath) {
    const snapshotDir = path.dirname(snapshotPath);

    try {
      fs.mkdirSync(snapshotDir);
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw e;
      }
    }
  }
}

module.exports = Registry;
