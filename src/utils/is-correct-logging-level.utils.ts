import { LogLevel } from '@nestjs/common';

const LogLevels: LogLevel[] = [
  'log',
  'debug',
  'error',
  'warn',
  'fatal',
  'verbose',
];

export const isCorrectLogLevel = (logLevel: LogLevel): logLevel is LogLevel => {
  return LogLevels.includes(logLevel);
};
