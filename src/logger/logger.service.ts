import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { DEFAULT_LOG_LEVEL } from 'src/constants/constants';
import { isCorrectLogLevel } from 'src/utils/is-correct-logging-level.utils';
import { stat, appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private path = './log';
  private logCount = 0;
  private errorCount = 0;
  private fileSize: number;
  private logFilename = 'log';
  private errorFilename = 'error';

  constructor() {
    super('App');
    this.setLogLevels(this.getLogLevels());
    this.fileSize = Number(process.env.FILE_SIZE);
    this.createLogDirectory();
  }

  async createLogDirectory() {
    try {
      await mkdir(this.path);
    } catch (error) {
      this.error(error.message);
    }
  }

  getLogLevels() {
    const logLevelFromEnv: LogLevel = <LogLevel>process.env.LOGGING_LEVEL;
    const logLevel = isCorrectLogLevel(logLevelFromEnv)
      ? logLevelFromEnv
      : DEFAULT_LOG_LEVEL;
    return [logLevel];
  }

  async verbose(message: string) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    await this.writeToLogFile(message, 'VERBOSE');
    super.verbose(message);
  }

  async debug(message: string) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    await this.writeToErrorFile(message, 'DEBUG');
    super.debug(message);
  }

  async log(message: string) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    await this.writeToLogFile(message, 'LOG');
    super.log(message);
  }

  async warn(message: string) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    await this.writeToErrorFile(message, 'WARN');
    super.warn(message);
  }

  async error(message: string) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    await this.writeToErrorFile(message, 'ERROR');
    super.error(message);
  }

  async fatal(message: string) {
    if (!this.isLevelEnabled('fatal')) {
      return;
    }
    await this.writeToErrorFile(message, 'FATAL');
    super.fatal(message);
  }

  private async writeToLogFile(message: string, type: string) {
    const path = await this.getLogfilePath();
    try {
      await appendFile(
        path,
        `${Date.now()}: [${type}] (${this.context}) - ${message}\n`,
        {
          flag: 'a',
        },
      );
    } catch (error) {
      this.error(error.message);
    }
  }

  private async getLogfilePath() {
    try {
      const { size } = await stat(
        join(this.path, `${this.logFilename}-${this.logCount}.log`),
      );
      if (size > this.fileSize) {
        this.logCount++;
      }
    } catch (error) {
      this.error(error.message);
    }
    return join(this.path, `${this.logFilename}-${this.logCount}.log`);
  }

  private async writeToErrorFile(message: string, type: string) {
    const path = await this.getErrorfilePath();
    try {
      await appendFile(
        path,
        `${Date.now()}: [${type}] (${this.context}) - ${message}\n`,
        {
          flag: 'a',
        },
      );
    } catch (error) {
      this.error(error.message);
    }
  }

  private async getErrorfilePath() {
    try {
      const { size } = await stat(
        join(this.path, `${this.errorFilename}-${this.errorCount}.log`),
      );
      if (size > this.fileSize) {
        this.errorCount++;
      }
    } catch (error) {
      this.error(error.message);
    }
    return join(this.path, `${this.errorFilename}-${this.errorCount}.log`);
  }
}
