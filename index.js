const {spawn} = require("node-pty");
const path = require("path");

const pyProcess = spawn("python", [path.resolve(__dirname, 'read.py')]);

const stream = (onData, onExit) => {
    pyProcess.on("data", data => {
        data = data.trim().split('\r\n');

        if (data.length && data[0] !== '' && data[0].indexOf('GPIO') === -1)
            onData(data[0]);
    });

    pyProcess.on("exit", exitCode => {
        onExit(exitCode);
    });
};

module.exports = stream;
