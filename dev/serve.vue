<template>
  <div id="app">
    <schema-form v-model="formModel" ref="formSchemaRef" class="center-form" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'">
      <template v-slot:operate-button>
        <div style="text-align: center">
          <el-button type="primary" @click="submit">提 交</el-button>
          <el-button type="default" @click="clear">清 空</el-button>
        </div>
      </template>
    </schema-form>
    <el-button @click="showDialogForm">弹窗表单</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue"
import { SchemaForm, FormDialog } from "../src"
import { FormSchema } from "../src/types"
import type { InternalRuleItem } from "async-validator"
import { ElMessage } from "element-plus"
export default defineComponent({
  name: "ServeDev",
  components: { SchemaForm },
  setup() {
    const formModel = ref({ username: "123", password: "" })
    var validatePass1 = (rule: InternalRuleItem, value: string | number, callback: (err?: Error) => Error | void) => {
      if (value !== 0 && !value) {
        callback(new Error("请输入密码"))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule: InternalRuleItem, value: string | number, callback: (err?: Error) => Error | void) => {
      if (value !== 0 && !value) {
        callback(new Error("请再次输入密码"))
      } else if (value !== formModel.value.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }

    const asyncOptions2 = function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: "超级管理员", value: 1 },
            { label: "普通管理员", value: 2 },
          ])
        }, 1000)
      })
    }
    const asyncOptions1 = function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: "男", value: 1 },
            { label: "女", value: 2 },
            { label: "其他", value: 3 },
          ])
        }, 1000)
      })
    }
    const asyncOptions = function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: "服装", value: 1 },
            { label: "数码", value: 2 },
            { label: "母婴", value: 3 },
          ])
        }, 1000)
      })
    }
    const formSchema: Ref<FormSchema> = ref({
      formItem: [
        { type: "input", label: "用户名", prop: "username", span: 12 },
        { type: "input", label: "姓名", prop: "name", span: 12 },
        { type: "input-password", label: "密码", prop: "password", span: 24 },
        { type: "input-password", label: "确认密码", prop: "repassword", span: 24 },
        {
          type: "checkbox",
          label: "角色",
          prop: "role",
          options: [],
          asyncOptions: asyncOptions2,
          span: 24,
        },
        {
          type: "radio",
          label: "性别",
          prop: "sex",
          // options: [
          //   { label: "男", value: 1 },
          //   { label: "女", value: 2 },
          // ],
          options: [],
          asyncOptions: asyncOptions1,
          span: 12,
          value: 1,
        },
        {
          type: "select",
          label: "分类",
          prop: "type",
          asyncOptions,
          span: 12,
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
          success: (file: File) => {
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
          success: (file: File) => {
            console.log("这里是上传 的文件11", file)
          },
        },
      ],
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ validator: validatePass1, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    })
    const fields = {}

    const formSchemaRef = ref()
    const submit = () => {
      formSchemaRef.value.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success("提交成功")
        }
      })
    }
    const clear = () => {
      formSchemaRef.value.schemaFormRef.resetFields()
    }

    const showDialogForm = () => {
      FormDialog.show({
        formSchema,
      })
    }

    return {
      formSchema,
      fields,
      submit,
      clear,
      formSchemaRef,
      showDialogForm,
      formModel,
    }
  },
})
</script>

<style>
#app > div {
  margin: 30px 0;
}
</style>
