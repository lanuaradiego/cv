import Logger from "../logger";

export default class ConsoleLogger implements Logger {
    assert(value: any, message?: string | undefined, ...optionalParams: any[]): void {
        console.assert(value, message, optionalParams);
    }
    debug(message?: any, ...optionalParams: any[]): void {
        console.debug(message, optionalParams);
    }
    error(message?: any, ...optionalParams: any[]): void {
        console.error(message, optionalParams);
    }
    info(message?: any, ...optionalParams: any[]): void {
        console.info(message, optionalParams);
    }
    log(message?: any, ...optionalParams: any[]): void {
        console.log(message, optionalParams);
    }
    warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message, optionalParams);
    }
}