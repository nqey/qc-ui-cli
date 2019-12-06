module.exports = async function init (packageJson, name) {
  const { stdin } = require('../util/utils')
  const ops = JSON.parse(packageJson)

  const projectName = await stdin({
    message: '项目名:',
    default: ops.name
  });

  const version = await stdin({
    message: '版本号',
    default: ops.version
  });

  const author = await stdin({
    message: '作者',
    default: ops.author
  });

  const description = await stdin({
    message: '项目描述',
    default: ops.description
  });

  // console.log('----------默认模版------------', packageJson)
  ops.name = projectName
  ops.version = version
  ops.author = author
  ops.description = description
  return ops;
}
