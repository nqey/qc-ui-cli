module.exports = function fetchPackageJson (dir) {
    try {
        return JSON.stringify(require(`${dir}/package.json`))
    } catch (err) {
        //当您找不到文件时，您会收到错误
        //但您也可以得到任何其他错误
        console.log('-------------未找到模版package.json，使用默认package.json----------------')
        return JSON.stringify(require('../tpl/package.json'))
    } 
}