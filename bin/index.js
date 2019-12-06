#!/usr/bin/env node

// 命令行界面解决方案包
const program = require('commander')

const path = require('path')
const fs = require('fs-extra')

const fetchRemoteTpl = require('../lib/fetchRemoteTpl')
const fetchPackageJson = require('../lib/fetchPackageJson')
const getTplAddress = require('../lib/initTplDir')
const { cleanArgs } = require('../util/utils')

process.on('exit', () => {
})

// 创建脚手架指令
program
  .version(`@qc/cli ${require('../package').version}`)
  .usage('<command> [options]')


program
  .command('create <project-name>')
  .description('创建一个新项目')
  // .option('-n, --name', '项目名称')
  // .option('-v, --version', '项目版本')
  // .option('-d, --description', '项目说明')
  // .option('-g, --git <address>', '模版地址')
  .action(async (name, cmd) => {

    // 获取执行参数
    const options = cleanArgs(cmd)

    // 根据用户输入结果得到模版地址&工作目录
    const dirOps = await getTplAddress(name)

    // 获取模版
    await fetchRemoteTpl(dirOps.tpldir, dirOps.tmpdir)

    // 获取模版配置项
    const packageJson = await fetchPackageJson(dirOps.tmpdir)

    // 用户与命令行交互初始化配置项
    const init = require('../lib/init')

    // 根据用户输入结果得到自定义配置项
    const customizePackageJson = await init(packageJson, name)

    // 写入自定义配置项
    fs.writeFileSync(path.resolve(dirOps.tmpdir, 'package.json'), JSON.stringify(customizePackageJson, null, 2))
  })

// 帮助信息 TODO
program.on('--help', () => {
  console.log()
  console.log()
})

program.parse(process.argv)
