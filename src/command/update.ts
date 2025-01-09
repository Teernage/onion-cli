import process from "child_process";
import chalk from "chalk";
import ora from "ora";

const spinner = ora({
  text: chalk.green("xzx-onion-cli 正在更新..."),
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      chalk.blue(item)
    ),
  },
});

/**
 * 更新 npm 包
 *
 * 启动一个加载指示器，并执行 npm 命令来全局安装最新版本的 xzx-onion-cli 包。
 * 如果安装过程中出现错误，将打印错误信息并停止加载指示器。
 * 如果安装成功，将打印成功信息并停止加载指示器。
 */
export function update() {
  spinner.start();
  process.exec("npm install xzx-onion-cli@latest -g", (err) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red(err));
      return;
    }
    console.log(chalk.green("更新成功"));
  });
}