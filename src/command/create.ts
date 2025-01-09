import { select, input } from '@inquirer/prompts';
import { clone } from './clone';
import path from 'path';
import fs from 'fs-extra';

export interface TemplateInfo {
  name: string;
  downloadUrl: string;
  branch: string;
  description: string;
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
 * 判断是否覆盖文件
 *
 * @param fileName 文件名
 * @returns 用户选择是否覆盖文件的布尔值
 */
export function isOverwrite(fileName: string) {
  console.warn(`${fileName} 已存在，是否覆盖？`);
  return select({
    message: '是否覆盖?',
    choices: [
      { name: '是', value: true },
      { name: '否', value: false },
    ],
  });
}

export async function create(projectName?: string) {
  if (!projectName) {
    projectName = await input({ message: '请输入项目名称' });
  }

  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName);
    if (run) {
      await fs.remove(filePath);
    } else {
      return;
    }
  }

  console.log('create', projectName);

  // 先选择项目类型
  const projectType = await select({
    message: '请选择项目类型',
    choices: [
      { name: 'Web项目', value: 'web' },
      { name: 'Chrome插件', value: 'chrome' },
    ],
  });

  let templateName: string;

  if (projectType === 'web') {
    // Web项目直接使用第一个模板
    templateName = 'vue3-Ts-web-page-template';
  } else {
    // Chrome插件选择具体类型
    const chromeTemplateList = Array.from(templates)
      .filter(([key]) => key.includes('chrome'))
      .map(([name, info]) => ({
        name: info.name,
        value: name,
        description: info.description,
      }));

    templateName = await select({
      message: '请选择Chrome插件类型',
      choices: chromeTemplateList,
    });
  }

  const info = templates.get(templateName);

  console.log('templateInfo', info);

  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch]);
  }
}
