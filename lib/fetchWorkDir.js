module.exports = function fetchWorkDir (name) {
    return require('path').join(process.cwd(), name)
}