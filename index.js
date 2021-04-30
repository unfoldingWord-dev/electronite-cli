const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'path.txt');

function getElectronPath() {
    if (fs.existsSync(pathFile)) {
        const executablePath = fs.readFileSync(pathFile, 'utf-8');
        if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
            return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath)
        }
        return path.join(__dirname, 'dist', executablePath)
    } else {
        throw new Error('Electronite failed to install correctly, please delete node_modules/electronite and try installing again')
    }
}


// TRICKY: Return the built-in electron package when running in the electron environment.
//  Otherwise, return the path so we can run the binary.
//  This enables using require("electronite") within the code.
try {
    module.exports = require('electron');
} catch (e) {
    module.exports = getElectronPath();
}
