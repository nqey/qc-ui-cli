module.exports = async function getTpAddress (name) {
    const { stdin } = require('../util/utils')
    const fetchWorkDir = require('./fetchWorkDir')

    const tpldir = await stdin({
      message: '模版地址:',
      default: 'github:nqey/QCUI#master'
    })

    const tmpdir = await stdin({
      message: '工作目录:',
      default: fetchWorkDir(name)
    })

    return {
    	tpldir,
    	tmpdir
    }

}
