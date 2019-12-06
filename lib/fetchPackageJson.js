module.exports = async function fetchPackageJson (dir) {
    const fs = require('fs-extra')
    const defaultJson = require('../tpl/package.json')
    try {
        return await fs.readFileSync(`${dir}/package.json`, 'utf-8')
    } catch (err) {
        //当您找不到文件时，您会收到错误
        //但您也可以得到任何其他错误
        console.log('-------------未找到模版package.json，使用默认package.json----------------')
        return JSON.stringify(defaultJson);
    } 
}