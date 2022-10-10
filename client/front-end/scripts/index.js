/* eslint no-console:0 consistent-return:0 */
"use strict";

import { Shader } from "./libs/GX/shader.js"
import { Program } from "./libs/GX/program.js"
import { read } from "./libs/tools.js"


let PATH = {
    vert: "../scripts/shaders/test.vsh",
    frag: "../scripts/shaders/test.fsh",
}


async function main() {
    // Get A WebGL context
    var canvas = document.querySelector("#main");
    var gl = canvas.getContext("webgl");
    Window.gl = gl;
    if (!gl) {
        return;
    }

    var vsh = Shader({ type: gl.VERTEX_SHADER, src: await read(PATH.vert), context: gl });
    var fsh = Shader({ type: gl.FRAGMENT_SHADER, src: await read(PATH.frag), context: gl });

    // Link the two shaders into a program
    let program = Program({ vert: vsh, frag: fsh, context: gl }).link().use();

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program.get(), "a_position");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // code above this line is initialization code.
    // code below this line is rendering code.

    gl.canvas.height = window.innerHeight;
    gl.canvas.width = window.innerWidth;

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
}


main()
