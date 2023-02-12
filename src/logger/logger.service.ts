import winston, { Logger as WinstonLogger, format as winstonFormat } from 'winston';
import { Logger } from '~/types/logger';

export class LoggerService implements Logger {
  private readonly logger: WinstonLogger;

  constructor () {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winstonFormat.combine(
            winstonFormat.colorize(),
            winstonFormat.simple()
          )
        })
      ]
    });
  }

  info = (message: string) => {
    this.logger.info(message);
  };

  warn = (message: string) => {
    this.logger.warn(message);
  };

  error = (message: string) => {
    this.logger.error(message);
  };
}
