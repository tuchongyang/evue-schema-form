import { createApp } from "vue"

import Dev from "./serve.vue"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"

const app = createApp(Dev)
app.use(ElementPlus, { locale: zhCn, size: "mini" })
import { FormDialog } from "../src/components"
app.use(FormDialog.install)
app.mount("#app")
