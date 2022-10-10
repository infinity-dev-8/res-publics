import { cls } from "../tools.js"


/**
 * 
 */
class shader {
    #obj;

    /** */
    constructor({ type, src, context }) {
        this.type = type;
        this.src = src;
        this.context = context;

        this.#obj = this.context.createShader(this.type);
        this.context.shaderSource(this.#obj, this.src);
        this.context.compileShader(this.#obj);
    }

    /** */
    delete() {
        this.context.deleteShader(this.#obj);
    }

    /**
     * Returns:
     * 1) WebGL shader parameter (parameter is a number)
     * 2) Information log (parameter is "log")
     * 3) WebGLShader (parameter = undefined)
     * @param {string | number} [parameter]
     * @returns {string | number | WebGLShader} Required parameter.
     */
    get(parameter) {
        if (parameter === "log") {
            return this.context.getShaderInfoLog(this.#obj);
        } else if (parameter) {
            return this.context.getShaderParameter(this.#obj, parameter);
        } else { return this.#obj; }
    }
}

export let Shader = cls(shader);
