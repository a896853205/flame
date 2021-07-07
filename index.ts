import { program } from 'commander';
import inquirer from 'inquirer';
import { download } from 'download-git-repo';

// 比如我们想执行ds init **的命令，想出现“初始化组件模板”的描述
// action是执行这个命令后续的回调，...args是后面**的参数

program
  .command('init')
  .description('初始化组件模板')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        name: 'description',
        message: '请输入项目描述',
      },
      {
        name: 'author',
        message: '请输入作者名称',
      },
    ]);

    console.log(answers.description, answers.author);
    download(
      'https://github.com/yokiyokiyoki/vue-fullpage.git#master',
      '1',
      { clone: true },
      err => {}
    );
  });

// 解析命令行
program.parse(process.argv);
