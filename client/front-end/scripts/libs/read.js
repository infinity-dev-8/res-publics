/**
 * Read data from path
 * @param {String} path Path to file to read
 */
export async function read(path) {
    return await (await fetch(path)).text();
}
