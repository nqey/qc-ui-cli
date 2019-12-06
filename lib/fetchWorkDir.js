module.exports = function fetchWorkDir (name) {
    // const os = require('os')
    const path = require('path')
    // console.log('--------------------当前目录--------------------', process.cwd())
    return path.join(process.cwd(), name || 'qc-cli')
}