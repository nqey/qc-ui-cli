module.exports = async function fetchRemoteTpl (tplDir, tmpdir) {
  const download = require('download-git-repo')
  const fs = require('fs-extra')

  const isExists = await new Promise((resolve, reject) => {
    fs.exists(tmpdir,async (exists) => resolve(exists))
  })

  if (isExists) {
    console.log('-----------------工作目录已存在跳过下载模版开始初始化----------------------')
    return false;
  }

  return await new Promise((resolve, reject) => {
    console.log('-----------------下载模版开始----------------------')
    download(tplDir, tmpdir, { clone:true }, async err => {
      if (err) {
      	console.log('-----------------下载模版失败----------------------', err)
      	return reject(err)
      }
      console.log('-----------------下载模版成功----------------------')
      resolve()
    })
  })
}
