// create-api.ts
import { createVNode, render, Plugin } from "vue"
import FormModal from "./FormDialog.vue"
import { FormSchema } from "../../types"
let _app: any

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const FormDialog = (options: Options) => {
  // 组件实例
  let formModal
  const container = document.createElement("div")
  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }
  formModal = createVNode(FormModal, { ...options, remove })
  // 使当前模态框继承App实例上下文
  _app && (formModal.appContext = _app._instance?.appContext)
  render(formModal, container)
  document.body.appendChild(container)
  return formModal
}

// 暴露一个插件 API
const install = (app: Plugin) => {
  _app = app
}

interface Options {
  formSchema: FormSchema
}
export { install }
