import { program } from 'commander';
import inquirer from 'inquirer';
import { resolve } from 'path';
import ora from 'ora';
// @ts-ignore
import { Clone } from 'nodegit';

interface Answers {
  name: string;
  description: string;
  author: string;
}

// 比如我们想执行ds init **的命令，想出现“初始化组件模板”的描述
// action是执行这个命令后续的回调，...args是后面**的参数

program
  .command('init')
  .description('初始化组件模板')
  .action(async () => {
    const answers: Answers = await inquirer.prompt([
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

    // TODO: loading start
    const spinner = ora('loading clone').start();

    try {
      const repository = await Clone.clone(
        // TODO： egg https://github.com/RenHanbin/flame-egg.git
        'https://gitee.com/qian-cheng-eric/flame.git#user',
        resolve(`./${answers.name}`)
      );

      // TODO: loading end
      spinner.succeed();
    } catch (error) {
      spinner.stop();
      console.error('项目克隆失败，可能是网络原因', error);
    }
  });

// 解析命令行
program.parse(process.argv);
