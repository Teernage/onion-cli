import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'

// 这里我们用 onion 当作我的指令名称
// 根目录下 node ./dist/index.js  onion -v
const program = new Command('onion');


program.version(version, '-v, --version');

program
  .command('create')
  .description('创建一个新的项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    console.log(dirName);

    create(dirName)
    // if (dirName) {
    //   create(dirName)
    // } else {
    //   console.log(`create ${dirName}`);
    // }
  });

program.parse();