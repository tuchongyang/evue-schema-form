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
  asyncOptions?: () => Promise<unknown>
  span?: number
  value?: string | number | Array<string | number>
  props?: {
    [key: string]: string | boolean | number
  }
  action?: string
  maxsize?: number
  fileType?: string
  success?: (file: File) => void
}
export interface FormItemRule extends RuleItem {
  trigger?: string
}
export declare interface FormSchema {
  formItem: Array<FormItem>
  rules?: {
    [key: string]: Array<FormItemRule>
  }
  labelWidth?: string
}
