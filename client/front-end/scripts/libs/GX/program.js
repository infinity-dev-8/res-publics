import { cls } from "../tools.js"


/** */
export class program {
    #obj;

    /** */
    constructor({ vert, frag, context }) {
        this.context = context;

        this.#obj = context.createProgram();
        this.attach(vert, frag);
    }

    /**
     * Attaches passed shaders to program.
     * @param  {...Shader} shaders - array of shaders to attach. 
     * @returns {Program} Itself.
     */
    attach(...shaders) {
        let context = this.context;
        return (shaders.forEach((shader) => {
            context.attachShader(this.#obj, shader.get());
        }), this);
    }

    /**
     * Detaches passed shaders from program.
     * @param  {...Shader} shaders - array of shaders to detach.
     * @returns {Program} Itself.
     */
    detach(...shaders) {
        let context = this.context;
        return (shaders.forEach((shader) => {
            context.detachShader(this.#obj, shader.get());
        }), this);
    }

    /**
     * Returns a list of all attached shaders to program.
     * @returns {...WebGLShader} Array of attached shaders.
     */
    shaders() {
        return this.context.getAttachedShaders(this.#obj);
    }

    /**
     * Links program (compiles and validates it).
     * @returns {WebGLProgram} Itself.
     */
    link() {
        return (this.context.linkProgram(this.#obj), this);
    }

    /**
     * Uses program to the passed WebGL context.
     * @returns {Program} Itself.
     */
    use() { // TODO: Can a program be created in one context and used in another ?
        return (this.context.useProgram(this.#obj), this);
    }

    /**
     * Deletes program.
     */
    delete() {
        this.context.deleteProgram(this.#obj);
    }

    /**
     * Returns:
     * 1) WebGL program parameter (parameter is a number)
     * 2) Information log (parameter is "log")
     * 3) WebGLProgram (parameter = undefined)
     * @param {string | number} [parameter]
     * @returns {string | number | WebGLProgram} Required parameter.
     */
    get(parameter) {
        if (parameter === "log") {
            return this.context.getProgramInfoLog(this.#obj);
        } else if (parameter) {
            return this.context.getProgramParameter(this.#obj, parameter);
        } else { return this.#obj; }
    }
}

export let Program = cls(program);
