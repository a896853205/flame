#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import { resolve } from 'path';
import ora from 'ora';
import fs from 'fs';
import handlebars from 'handlebars';
// @ts-ignore
import { Clone } from 'nodegit';

interface Answers {
  frameworkType: string;
  name: string;
  description: string;
  author: string;
}

program
  .command('init')
  .description('初始化组件模板')
  .action(async () => {
    const answers: Answers = await inquirer.prompt([
      {
        name: 'frameworkType',
        message: '请选择生成的框架',
        type: 'list',
        choices: ['前端(React)', '后端(Egg)'],
      },
      {
        name: 'name',
        message: '请输入项名称',
      },
      {
        name: 'description',
        message: '请输入项目描述',
      },
      {
        name: 'author',
        message: '请输入作者名称',
      },
    ]);

    const spinner = ora('loading clone').start();

    let cloneURL = '';
    switch (answers.frameworkType) {
      case '前端(React)':
        cloneURL = 'https://gitee.com/qian-cheng-eric/flame.git';
        break;
      case '后端(Egg)':
        cloneURL = 'https://gitee.com/sageren/flame-egg.git';
        break;
    }
    try {
      await Clone.clone(
        cloneURL,
        resolve(`./${answers.name}`)
      );

      spinner.succeed();
    } catch (error) {
      spinner.stop();
      console.error('项目克隆失败，可能是网络原因', error);
    }

    const fileName = `${answers.name}/package.json`;
    // 判断一下是否有这个文件
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      const result = handlebars.compile(content)(answers);
      fs.writeFileSync(fileName, result);
    }
  });

// 解析命令行
program.parse(process.argv);
