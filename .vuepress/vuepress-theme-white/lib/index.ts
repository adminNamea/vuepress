const path = require('path')
export default (options) => {
    return {
        name: 'vuepress-theme-white',
        // extends: '@vuepress/theme-default',
        clientAppEnhanceFiles: path.resolve(__dirname, 'clientAppEnhance.ts').replace(/\\/g, '\/'),
        clientAppSetupFiles: path.resolve(__dirname, 'clientAppSetup.ts').replace(/\\/g, '\/'),
        layouts: {
            Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
            404: path.resolve(__dirname, 'layouts/404.vue')
        },
        plugins: [
            ['@vuepress/theme-data', { themeData: options }],
            ['@vuepress/nprogress', true],
        ]
    }
}