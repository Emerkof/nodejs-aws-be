const logLevels = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

class Logger {
  constructor(transport = console, levels = logLevels) {
    this.transport = transport;
    this.logLevels = levels;
  }

  log(level = this.logLevels.INFO, ...data) {
    if (!this.transport[level]) {
      throw new Error(`Level '${level}' is not supported for this transport`);
    }

    return this.transport[level](...data);
  }
}

export default new Logger();


