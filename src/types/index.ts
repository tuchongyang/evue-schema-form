import type { RuleItem } from "async-validator"
interface OptionLabel {
  label: string
  value: string | number
}
interface FormItem {
  prop: string
  type: string
  label: string
  options?: Array<OptionLabel>
  span?: number
  value?: string | number | Array<string | number>
}
export interface FormItemRule extends RuleItem {
  trigger?: string
}
export declare interface FormSchema {
  formItem: Array<FormItem>
  rules: {
    [key: string]: Array<FormItemRule>
  }
  labelWidth: string
}
