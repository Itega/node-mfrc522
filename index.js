const {spawn} = require("node-pty");

const pyProcess = spawn("python", ["./read.py"]);

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

const onData = uid => {
    console.log(data)
};

const onExit = exitCode => {
    console.log('Exit code : ' + exitCode)
};

stream(onData, onExit);

module.exports = stream;
