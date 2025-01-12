import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update';

// 这里我们用 onion 当作我的指令名称
// 根目录下 node ./dist/index.js  onion -v
const program = new Command('onion');

// 添加多个信号处理  
process.on('SIGINT', handleExit)
process.on('SIGTERM', handleExit)
process.on('SIGQUIT', handleExit)

function handleExit() {
  console.log('\n👋 感谢使用 onion-cli')
  process.exit(0)
}

program.version(version, '-v, --version');

program
  .command('update') // 命令名称
  .description('更新脚手架 xzx-onion 版本') // 命令描述
  .action(async () => { // 命令执行函数
    await update()
  })

program
  .command('create') // 命令名称
  .description('创建一个新的项目') // 命令描述
  .argument('[name]', '项目名称') // 命令参数
  .action(async (dirName) => { // 命令执行函数
    create(dirName)
  });

// 解析命令行参数
program.parse();

