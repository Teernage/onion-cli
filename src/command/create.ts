import { select, input } from '@inquirer/prompts';
import { clone } from './clone';
import path from 'path';
import fs from 'fs-extra';

export interface TemplateInfo {
  name: string; // 模版名称
  downloadUrl: string; // 模版下载地址
  branch: string; // 模版分支
  description: string; // 项目描述
}

/**
 * 模板列表
 */
export const templates: Map<string, TemplateInfo> = new Map([
  [
    'vue3-Ts-web-page-template',
    {
      name: 'admin-template',
      downloadUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发web项目',
      branch: 'feature_xzx_web_page',
    },
  ],
  [
    'vue3-Ts-chrome-newtab-extensions-template',
    {
      name: 'admin-template',
      downloadUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome标签页模板',
      branch: 'main',
    },
  ],
  [
    'vue3-Ts-chrome-sidebar-extensions-template',
    {
      name: 'admin-template',
      downloadUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome侧边栏模板',
      branch: 'feature_xzx_chrome_sidebar_extension',
    },
  ],
  [
    'vue3-Ts-chrome-popup-extensions-template',
    {
      name: 'admin-template',
      downloadUrl: 'https://github.com/Teernage/onion-vue-template.git',
      description: 'Vue3技术栈开发chrome弹窗模板',
      branch: 'feature_xzx_chrome_popup_extension',
    },
  ],
]);

/**
 * 判断文件是否需要覆盖
 *
 * @param fileName 文件名
 * @returns 返回一个布尔值，表示用户是否选择覆盖文件
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

/**
 * 创建一个新的项目
 *
 * @param projectName 可选参数，项目名称
 */
export async function create(projectName?: string) {
  // 初始化模版列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item;
      return {
        name,
        value: name,
        description: info.description,
      };
    }
  );

  if (!projectName) {
    projectName = await input({ message: '请输入项目名称' });
  }

  // 如果项目名文件夹已经存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName);
    // 如果用户选择覆盖，则删除已存在的文件夹
    if (run) {
      await fs.remove(filePath);
    } else {
      return; // 不覆盖直接结束
    }
  }

  console.log('create', projectName);
  // 往下执行 提示用户选择模板
  const templateName = await select({
    message: '请选择模板',
    choices: templateList,
  });

  const info = templates.get(templateName);

  console.log('templateInfo', info);

  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch]);
  }
}
