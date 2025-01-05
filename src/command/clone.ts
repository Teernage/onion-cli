import simpleGit, { SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk';

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      chalk.green(item)
    )
  }
})

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前目录
  maxConcurrentProcesses: 6,  // 最大并发数
  binary: 'git', // git 可执行文件的路径
}


/**
 * 克隆远程仓库到本地
 *
 * @param url 远程仓库的URL
 * @param projectName 本地项目名称
 * @param options 额外的克隆选项数组
 */
export async function clone(url: string, projectName: string, options: string[]) {
  const git = simpleGit(gitOptions);

  try {

    await logger(git.clone(url, projectName, options), '代码下载中...', {
      estimated: 7000 // 预计下载时间
    })

    console.log(chalk.green('代码下载完成！'));
    console.log(chalk.blackBright('===================================='));
    console.log(chalk.blackBright('========欢迎使用 onion-cli 脚手架====='));
    console.log(chalk.blackBright('===================================='));
    console.log();
    console.log();

    console.log(chalk.blackBright('========请使用 pnpm install 安装依赖====='));
    console.log(chalk.blackBright('========pnpm run dev 运行项目====='));


  } catch (error) {
    console.error(chalk.red('代码下载失败：', error));
  }
}