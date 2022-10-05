import { decs, aclass } from "./libs/tools.js"


/**
 * Aboba does it works?
 */
export let Shader = decs(
    aclass,
)(function ({ type, src, ctx }) {
    this.type = type;
    this.src = src;
    this.ctx = ctx;

    this._obj = this.ctx.createShader(this.type);
    this.ctx.shaderSource(this._obj, this.src);
    this.ctx.compileShader(this._obj);

    return this;
})


/**
 * @param {string} aboba
 */
export let Program = decs(
    aclass
)(function Program({ vsh, fsh, ctx }) {
    this.ctx = ctx;
    this._obj = this.ctx.createProgram();
    this.ctx.attachShader(this._obj, vsh._obj);
    this.ctx.attachShader(this._obj, fsh._obj);
    this.ctx.linkProgram(this._obj);

    this.ctx.useProgram(this._obj);
})
