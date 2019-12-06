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

module.exports = {
	mkdir,
	stdin
}