import Logger from "./logger";

export default class LoggerComposite implements Logger {
    private loggers: Set<Logger> = new Set();

    addLogger(logger: Logger): this {
        this.loggers.add(logger);
        return this;
    }

    assert(value: any, message?: string | undefined, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.assert(value, message, optionalParams));
    }
    debug(message?: any, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.debug(message, optionalParams));
    }
    error(message?: any, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.error(message, optionalParams));
    }
    info(message?: any, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.info(message, optionalParams));
    }
    log(message?: any, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.log(message, optionalParams));
    }
    warn(message?: any, ...optionalParams: any[]): void {
        this.loggers.forEach(logger => logger.warn(message, optionalParams));
    }
}