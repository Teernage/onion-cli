import { defineConfigWithTheme } from 'vitepress';

export default defineConfigWithTheme({
  title: 'onion-cli',
  base: '/onion-cli/',
  appearance: 'dark',
  head: [['link', { rel: 'icon', href: '/onion-cli-homepage/img/icon.svg' }]],
  themeConfig: {
    musicBall: {
      src: '/onion-cli-homepage/mp3/永远同在.mp3',
      autoplay: true,
      loop: true,
    },
    nav: [{ text: '首页', link: '/' }],

    sidebar: {
      '/content': [
        {
          text: '快速开始',
          items: [
            {
              text: 'web page(web项目模版)',
              link: '/content/web',
            },
            {
              text: 'chrome crx(chrome插件模版)',
              link: '/content/chrome',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
