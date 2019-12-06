#!/usr/bin/env node

const program = require('commander')
const fetchRemoteTpl = require('../lib/fetchRemoteTpl')
const fetchPackageJson = require('../lib/fetchPackageJson')
const init = require('../lib/init')
const getTplAddress = require('../lib/initTplDir')
const path = require('path')
const fs = require('fs-extra')

process.on('exit', () => {
})


program
  .version(`@juma/cli ${require('../package').version}`)
  .usage('<command> [options]')


program
  .command('create <project-name>')
  .description('创建一个新项目')
  // .option('-n, --name', '项目名称')
  // .option('-v, --version', '项目版本')
  // .option('-d, --description', '项目说明')
  // .option('-g, --git <address>', '模版地址', (p1, p2) => {console.log(p1, p2)})
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd)
    const dirOps = await getTplAddress(name)
    // console.log('-----------------地址----------------------', dirOps)
    await fetchRemoteTpl(dirOps.tpldir, dirOps.tmpdir)
    const packageJson = await fetchPackageJson(dirOps.tmpdir)
    const customizePackageJson = await init(packageJson, name)
    // console.log('-----------------自定义模----------------------', customizePackageJson)
    fs.writeFileSync(path.resolve(dirOps.tmpdir, 'package.json'), JSON.stringify(customizePackageJson, null, 2))
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log()
})


program.parse(process.argv)

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    // console.log('-----------------执行参数----------------------', o)
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
