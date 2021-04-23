import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const path = require('path')
export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: '1',
    description: '这是我的第一个 VuePress 站点',
    theme: path.resolve(__dirname, 'vuepress-theme-white/lib'),
    themeConfig: {
        serviceWorker: {
            updatePopup: true
        },
        logo: 'https://vuejs.org/images/logo.png',
        tip: '提示',
        warning: '注意!',
        danger: '警告',

        // 404 page
        notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        navbar: [
            // NavbarItem
            {
                text: '1',
                link: 'http://baidu.com/',
            },
            {
                text: '2',
                link: '/2/',
                children: [{
                    text: '3',
                    link: 'http://baidu.com/',
                }, {
                    text: '4',
                    link: '/4/',
                }]
            },
            // NavbarGroup
            {
                text: '5',
                link: '/5/',
                children: ["6", "7"]
            },
            "/8/"
        ],
    },
})