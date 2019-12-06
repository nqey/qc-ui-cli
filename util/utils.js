const fs = require('fs-extra')
const inquirer = require('inquirer')

const stdin = async (options) => {
	const ops = Object.assign(
		{}, 
	  {
      type: 'input',
      name: 'inputed',
      message: '',
      default: ''
    },
    options || {}
  )
  return await new Promise((resolve, reject) => {
    inquirer.prompt([ops]).then(answers => {
      resolve(answers.inputed)
    }).catch()
  })
}

const mkdir = (dir) => {
  return fs.mkdir(dir, {
    recursive: true  //是否递归,默认false
  }, (err) => {
    if(err){
      console.log(err);
      return;
    }
  });
}


// 过滤执行参数
const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// 提取执行参数
const cleanArgs = (cmd) => {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // 过滤不存在参数&Command重名
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

module.exports = {
	mkdir,
	stdin,
  cleanArgs
}