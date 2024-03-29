#!/usr/bin/env node

var electronite = require('./');

var proc = require('child_process');

var child = proc.spawn(electronite, process.argv.slice(2), {stdio: 'inherit', windowsHide: false});
child.on('close', function (code, signal) {
    if (code === null) {
        console.error(electronite, 'exited with signal', signal);
        process.exit(1);
    }
    process.exit(code);
});

const handleTerminationSignal = function (signal) {
    process.on(signal, function signalHandler() {
        if (!child.killed) {
            child.kill(signal)
        }
    })
};

handleTerminationSignal('SIGINT');
handleTerminationSignal('SIGTERM');
