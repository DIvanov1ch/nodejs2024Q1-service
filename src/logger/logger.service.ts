import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { DEFAULT_LOG_LEVEL } from 'src/constants/constants';
import { isCorrectLogLevel } from 'src/utils/is-correct-logging-level.utils';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super('App');
    this.setLogLevels(this.getLogLevels());
  }

  getLogLevels() {
    const logLevelFromEnv: LogLevel = <LogLevel>process.env.LOGGING_LEVEL;
    const logLevel = isCorrectLogLevel(logLevelFromEnv)
      ? logLevelFromEnv
      : DEFAULT_LOG_LEVEL;
    return [logLevel];
  }
}
