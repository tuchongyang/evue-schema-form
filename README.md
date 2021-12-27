# @evue/schema-form

## 简介

基于 vue3 与 element-plus 的表格插件，数据驱动模型，渲染视图，并通过数据模型来实现各种交互。

## 安装

``` shell

npm instll @evue/schema-form -S

```

## 使用

全局引用

```javascript

import {SchemaForm} from "@evue/schema-form" 

app.component(SchemaForm)

```

局部引用

注：全局引用后，无需局部引用。

``` vue
<template>
    <schema-form ref="formSchemaRef" :fields="fields" :form-schema="formSchema">
        <template v-slot:operate-button>
        <div style="text-align: center">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button type="default" @click="clear">清 空</el-button>
        </div>
        </template>
    </schema-form>
</template>

<script>
import { defineComponent, ref } from "vue"
import { SchemaForm } from "@evue/schema-form" 

export default defineComponent({
  name: "ServeDev",
  components: { SchemaForm },
  setup() {
    const formSchema = {
      formItem: [
        { type: "input", label: "用户名", prop: "username", span: 12 },
        { type: "input", label: "姓名", prop: "name", span: 12 },
        { type: "input-password", label: "密码", prop: "password", span: 24 },
        {
          type: "select",
          label: "角色",
          prop: "role",
          options: [
            { label: "超级管理员", value: 1 },
            { label: "普通管理员", value: 2 },
          ],
          span: 24,
        },
        {
          type: "radio",
          label: "性别",
          prop: "sex",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
          span: 12,
          value: 1,
        },
        {
          type: "input-number",
          label: "年龄",
          prop: "age",
          value: 1,
          props: {
            controlsPosition: "right",
          },
          span: 12,
        },
        {
          type: "file",
          label: "头像",
          prop: "avatar",
          span: 12,
          success: (file) => {
            console.log("这里是上传 的文件", file)
          },
        },
        {
          type: "file",
          label: "照片",
          prop: "image",
          span: 12,
          action: "/api/file/upload",
          maxsize: 1024 * 1024 * 50,
          fileType: "image",
          success: (res, file) => {
            console.log(res, file)
          },
        },
      ],
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    }
    const fields = {}

    const formSchemaRef = ref()
    const submit = () => {
      formSchemaRef.value.validate((valid) => {
        if (valid) {
          console.log("提交成功")
        }
      })
    }
    const clear = () => {
      formSchemaRef.value.schemaFormRef.resetFields()
    }


    return {
      formSchema,
      fields,
      submit,
      clear,
      formSchemaRef,
    }
  },
})
</script>
```

## 弹窗表单

函数式调用可以直接引入`FormDialog`组件，传参形式与schemaForm一致。

需全局注册，否则无法继承全局组件与配置

``` javascript
// main.js
import { FormDialog } from "@evue/schema-form" 
app.use(FormDialog.install)

```


### 使用样例

``` vue
<template>
    <el-button type="primary" @click="showDialogForm">打开弹窗表单</el-button>
</template>

<script>
import { defineComponent, ref } from "vue"
import { FormDialog } from "@evue/schema-form" 

export default defineComponent({
  name: "ServeDev",
  components: { SchemaForm },
  setup() {
    const formSchema = {
      formItem: [
        { type: "input", label: "用户名", prop: "username", span: 12 },
        { type: "input", label: "姓名", prop: "name", span: 12 },
        { type: "input-password", label: "密码", prop: "password", span: 24 },
        {
          type: "select",
          label: "角色",
          prop: "role",
          options: [
            { label: "超级管理员", value: 1 },
            { label: "普通管理员", value: 2 },
          ],
          span: 24,
        },
        {
          type: "radio",
          label: "性别",
          prop: "sex",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
          span: 12,
          value: 1,
        },
        {
          type: "input-number",
          label: "年龄",
          prop: "age",
          value: 1,
          props: {
            controlsPosition: "right",
          },
          span: 12,
        },
        {
          type: "file",
          label: "头像",
          prop: "avatar",
          span: 12,
          success: (file) => {
            console.log("这里是上传 的文件", file)
          },
        },
        {
          type: "file",
          label: "照片",
          prop: "image",
          span: 12,
          action: "/api/file/upload",
          maxsize: 1024 * 1024 * 50,
          fileType: "image",
          success: (res, file) => {
            console.log(res, file)
          },
        },
      ],
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    }
    const fields = {}
    const showDialogForm = () => {
      FormDialog.show({
        title:"修改信息",
        fields,
        formSchema,
      })
    }

    return {
      showDialogForm
    }
  },
})
</script>
```



## Keywords
form vue3-form schema-form