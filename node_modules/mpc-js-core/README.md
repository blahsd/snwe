# mpc.js

mpc.js is a javascript client library for the [Music Player Daemon](https://www.musicpd.org/).

It features a Promise-based API for all [mpd commands](https://www.musicpd.org/doc/protocol/command_reference.html),
type definitions for [Typescript](https://www.typescriptlang.org/) and works in both
[node.js](https://nodejs.org/) and current browsers (connecting to mpd through a WebSocket bridge
like [websockify](https://github.com/kanaka/websockify)).

This is the core package containing everything except the browser- and node-specific networking code.

## Documentation

Installation and usage examples for mpc.js can be found [here](https://github.com/hbenl/mpc-js-node)
and [Typedoc](http://typedoc.org/)-generated API documentation is available 
[here](https://hbenl.github.io/mpc-js-core/typedoc/classes/_mpccore_.mpccore.html).
