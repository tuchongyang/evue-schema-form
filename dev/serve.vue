<template>
  <div id="app">
    <schema-form ref="formSchemaRef" class="center-form" :fields="fields" :form-schema="formSchema" :label-width="formSchema.labelWidth || '110px'">
      <template v-slot:operate-button>
        <div style="text-align: center">
          <el-button type="primary" @click="submit">提 交</el-button>
          <el-button type="default" @click="clear">清 空</el-button>
        </div>
      </template>
    </schema-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { SchemaForm } from "../src"
import { ElMessage } from "element-plus"
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
        username: [{ required: "true", message: "请输入用户名", trigger: "blur" }],
      },
    }
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

<style>
#app > div {
  margin: 30px 0;
}
</style>
