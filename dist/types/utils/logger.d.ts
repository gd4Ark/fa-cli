/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
export declare const log: (...args: any[]) => void;
/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
export declare const fatal: (...args: any[]) => void;
/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
export declare const success: (...args: any[]) => void;
declare const _default: {
    log: (...args: any[]) => void;
    fatal: (...args: any[]) => void;
    success: (...args: any[]) => void;
};
export default _default;
