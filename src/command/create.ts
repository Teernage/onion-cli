import { select, input } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import path from 'path';
import fs from 'fs-extra';
import { name, version } from '../../package.json';
import axios, { AxiosResponse } from 'axios';
import { gt } from 'lodash';
import chalk from 'chalk';

export interface TemplateInfo {
  name: string;
  downloadUrl: string;
  branch: string;
  description: string;
}

// 添加全局的信号处理  
process.on('SIGINT', () => {
  console.log('\n👋 感谢使用 onion-cli');
  process.exit(0);
});

/**
 * 封装 select 函数以处理用户使用脚手架期间control c中断程序 
 * @param options 
 * @returns 
 */
async function safeSelect<T>(options: any): Promise<T> {
  try {
    return await select(options);
  } catch (error: any) {
    if (error?.message?.includes('User force closed')) {
      console.log('\n👋 感谢使用 onion-cli');
      process.exit(0);
    }
    throw error;
  }
}



/**
 * 封装 input 函数以处理用户使用脚手架期间control c中断程序 
 * @param options 
 * @returns 
 */
async function safeInput(options: any): Promise<string> {
  try {
    return await input(options);
  } catch (error: any) {
    if (error?.message?.includes('User force closed')) {
      console.log('\n👋 感谢使用 onion-cli');
      process.exit(0);
    }
    throw error;
  }
}

export async function isOverwrite(fileName: string): Promise<boolean> {
  console.warn(`${fileName} 已存在，是否覆盖？`);
  return await safeSelect({
    message: '是否覆盖?',
    choices: [
      { name: '是', value: true },
      { name: '否', value: false },
    ]
  });

}

/**
 * 模板列表
 */
export const templates: Map<string, TemplateInfo> = new Map([
  [
    'vue3-Ts-web-page-template',
    {
      name: 'web-template',
      downloadUrl: 'https://gitee.com/xuzhenxin110/onion-vue-template.git',
      backupUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发web项目',
      branch: 'feature_xzx_web_page',
    },
  ],
  [
    'vue3-Ts-chrome-newtab-extensions-template',
    {
      name: 'chrome-newtab-template',
      downloadUrl: 'https://gitee.com/xuzhenxin110/onion-vue-template.git',
      backupUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome标签页模板',
      branch: 'main',
    },
  ],
  [
    'vue3-Ts-chrome-sidebar-extensions-template',
    {
      name: 'chrome-sidebar-template',
      downloadUrl: 'https://gitee.com/xuzhenxin110/onion-vue-template.git',
      backupUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome侧边栏模板',
      branch: 'feature_xzx_chrome_sidebar_extension',
    },
  ],
  [
    'vue3-Ts-chrome-popup-extensions-template',
    {
      name: 'chrome-popup-template',
      downloadUrl: 'https://gitee.com/xuzhenxin110/onion-vue-template.git',
      backupUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome弹窗模板',
      branch: 'feature_xzx_chrome_popup_extension',
    },
  ],
]);

/**
 * 获取npm包的信息
 *
 * @param npmName npm包的名称
 */
async function getNpmInfo(npmName: string) {
  // const npmUrl = `https://registry.npmjs.org/${npmName}`;
  // 使用淘宝镜像
  const npmUrl = `https://registry.npmmirror.com/${npmName}`;
  let res = {};
  try {
    res = await axios.get(npmUrl);
  } catch (error) {
    console.error(error);
  }
  return res;
}

/**
 * 获取指定 npm 包的最新版本号
 *
 * @param name 需要查询的 npm 包名
 */
async function getNpmLatestVersion(name: string) {
  const { data } = (await getNpmInfo(name)) as AxiosResponse;
  return data['dist-tags'].latest;
}

/**
 * 检查脚手架版本更新
 *
 * @param name 软件名称
 * @param version 当前版本号
 */
export async function checkVersion(name: string, version: string) {
  // 检查版本更新
  const lastVersion = await getNpmLatestVersion(name);
  const needUpdate = gt(lastVersion, version);
  if (needUpdate) {
    console.warn(
      `发现当前脚手架的最新版本为${chalk.blackBright(
        lastVersion
      )}，当前版本为${chalk.blackBright(version)}`
    );
    console.log(
      `可使用${chalk.yellow(
        'npm install xzx-onion-cli@latest -g'
      )}，或者使用：${chalk.yellow('onion update')}指令更新！`
    );
  }
  return needUpdate;
}


/**
 * 创建一个新的项目
 *
 * @param projectName 项目名称，如果未提供，则通过命令行输入
 * @returns 无返回值
 */
export async function create(projectName?: string) {
  try {
    let step = 1;
    let finalProjectName: string = projectName || ''; // 新增一个确定是string类型的变量  

    let isNeedCreateName = false;
    while (true) {
      // 步骤1: 输入项目名称  
      if (step === 1) {

        // 如果未提供项目名称，则通过命令行输入  
        if (!finalProjectName) {
          finalProjectName = await safeInput({
            message: '请输入项目名称',
            default: projectName // 如果有传入的projectName，用作默认值  
          });
          isNeedCreateName = true;
        }


        const filePath = path.resolve(process.cwd(), finalProjectName);
        if (fs.existsSync(filePath)) {
          const flag = await isOverwrite(finalProjectName);
          if (!flag) {
            process.exit(0);
          } else {
            await fs.remove(filePath);
          }
        }

        // 检查版本更新  
        await checkVersion(name, version);

        step = 2;
        continue;
      }

      // 步骤2: 选择项目类型  
      if (step === 2) {
        const projectType = await safeSelect({
          message: '请选择项目类型',
          choices: [
            { name: 'Web项目', value: 'web' },
            { name: 'Chrome插件', value: 'chrome' },
            { name: '返回上一步', value: 'back' }
          ]
        });

        if (projectType === 'back') {
          step = 1;
          finalProjectName = '';
          continue;
        }

        if (projectType === 'web') {
          const templateName = 'vue3-Ts-web-page-template';
          const info = templates.get(templateName);
          if (!info) {
            throw new Error('未找到对应的模板信息');
          }
          await clone(info.downloadUrl, finalProjectName, ['-b', info.branch]);
          break;
        } else {
          step = 3;
          continue;
        }
      }

      // 步骤3: 选择Chrome插件类型  
      if (step === 3) {
        const chromeTemplateList = Array.from(templates)
          .filter(([key]) => key.includes('chrome'))
          .map(([name, info]) => ({
            name: info.name,
            value: name,
            description: info.description,
          }));

        chromeTemplateList.push({
          name: '返回上一步',
          value: 'back',
          description: '返回项目类型选择'
        });

        const templateName: string = await safeSelect({
          message: '请选择Chrome插件类型',
          choices: chromeTemplateList
        });

        if (templateName === 'back') {
          step = 2;
          continue;
        }

        const info = templates.get(templateName);
        if (!info) {
          throw new Error('未找到对应的模板信息');
        }
        await clone(info.downloadUrl, finalProjectName, ['-b', info.branch]);
        break;
      }
    }

  } catch (error: any) {
    if (error?.message?.includes('User force closed')) {
      console.log('\n👋 感谢使用 onion-cli');
      process.exit(0);
    }
    console.error(chalk.red('❌ 发生错误:'), error.message);
    process.exit(1);
  }
}