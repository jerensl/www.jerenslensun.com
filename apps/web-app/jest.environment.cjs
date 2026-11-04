const JSDOMEnvironment = require('jest-environment-jsdom').default
const { Buffer: NodeBuffer } = require('node:buffer')
const { TextDecoder, TextEncoder } = require('node:util')

// Derive the Node.js realm constructors from a Node.js Buffer instance. The
// environment module itself may run inside the jsdom realm, so the bare
// global constructors here are not necessarily the Node.js ones.
const NodeUint8Array = Object.getPrototypeOf(NodeBuffer.prototype).constructor
const NodeArrayBuffer = new NodeUint8Array(0).buffer.constructor

/**
 * jsdom installs its own typed array constructors. Modern esbuild validates
 * `Buffer.from('') instanceof Uint8Array`, which fails when the Node.js
 * `Buffer` is checked against jsdom's `Uint8Array`. Align the globals with
 * Node.js so libraries such as esbuild (used by mdx-bundler) keep working.
 */
class FixedTypedArrayJSDOMEnvironment extends JSDOMEnvironment {
    constructor(...args) {
        super(...args)

        this.global.ArrayBuffer = NodeArrayBuffer
        this.global.Uint8Array = NodeUint8Array
        this.global.Buffer = NodeBuffer
        this.global.TextDecoder = TextDecoder
        this.global.TextEncoder = TextEncoder
    }
}

module.exports = FixedTypedArrayJSDOMEnvironment
