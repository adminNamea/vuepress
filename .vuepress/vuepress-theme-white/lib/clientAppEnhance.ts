import { defineClientAppEnhance } from '@vuepress/client'
import AntDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/layout.scss';

export default defineClientAppEnhance(({ app }) => {
    app.use(AntDesign)
})