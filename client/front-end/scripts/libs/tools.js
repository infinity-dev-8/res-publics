/**
 * Read data from path
 * @param {String} path Path to file to read
 */
export async function read(path) {
    return await (await fetch(path)).text();
}


/**
 * @template inst
 * @param {new() => inst} cls 
 * @returns {inst}
 */
export function cls(cls) {
    return (...args) => new cls(...args);
}


/**
 * @param {...Function} ...args decorators
 * @returns {Function} function factory
 */
export function decs() {
    let decorators = arguments;
    return (func) => (
        [...decorators].reduce(
            (func, dec) => dec(func),
            func
        )
    );
}
