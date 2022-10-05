/**
 * Read data from path
 * @param {String} path Path to file to read
 */
export async function read(path) {
    return await (await fetch(path)).text();
}


export function aclass(func) {
    return function () {
        if (!(this instanceof func)) {
            return new func(...arguments)
        }
        return func(...arguments);
    }
}

/**
 * @param {...Function} ...args decorators
 * @returns {Function} function factory
 */
export function decs() {
    let decorators = arguments;
    return function (func) {
        for (let decorator of decorators) {
            func = decorator(func);
        }
        return func;
    }
}

decs()