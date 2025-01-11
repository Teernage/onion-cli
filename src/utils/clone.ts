import simpleGit, { SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';
import log from './log';

const figlet = require('figlet');

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      chalk.green(item)
    ),
  },
});

/**
 * 打印一个彩色字符串到控制台。
 *
 * 使用 figlet 库将文本转换为 ASCII 艺术，并使用 chalk 库将文本着色为亮绿色。
 *
 * @returns 无返回值
 */
const goodPrinter = async () => {
  const data = await figlet('xzx-onion-cli')
  console.log(chalk.greenBright(`${data}`));
};

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前目录
  maxConcurrentProcesses: 6, // 最大并发数
  binary: 'git', // git 可执行文件的路径
};

/**
 * 克隆远程仓库到本地
 *
 * @param url 远程仓库的URL
 * @param projectName 本地项目名称
 * @param options 额外的克隆选项数组
 */
export async function clone(
  url: string,
  projectName: string,
  options: string[]
) {
  const git = simpleGit(gitOptions);

  try {
    await logger(git.clone(url, projectName, options), '代码下载中...', {
      estimate: 10000, // 预计下载时间
    });
    goodPrinter()
    console.log(chalk.blackBright('===================================='));
    console.log(chalk.blackBright('========欢迎使用 onion-cli 脚手架====='));
    console.log(chalk.blackBright('===================================='));
    console.log();
    log.success(`项目创建成功 ${chalk.blueBright(projectName)}`);
    log.success(`执行一下命令启动项目`)
    log.info(`cd ${chalk.blueBright(projectName)}`);
    log.info(`${chalk.yellow('pnpm')} install`);
    log.info(`${chalk.yellow('pnpm')} run dev`);
  } catch (error) {
    log.error(chalk.red('代码下载失败：', error));
  }
}
