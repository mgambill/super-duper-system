import { watchEffect, readonly, computed, inject, ref } from "vue"
import TextField from './TextField.vue'
import CheckboxField from './CheckboxField.vue'
import CheckboxListField from './CheckboxListField.vue'
import EmptyField from './EmptyField.vue'
import GridField from './GridField.vue'

import YesNoField from "./YesNoField.vue"
import RadioListField from "./RadioListField.vue"
import ParagraphField from "./ParagraphField.vue"
import DropdownField from "./DropdownField.vue"

import NumericField from "./NumericField.vue"
import DateField from "./DateField.vue"
import MarkupField from "./MarkupField.vue"

import Container from "../Container.vue"

const map = {
  'text': TextField,
  'numeric': NumericField,
  'date': DateField,
  'checkbox': CheckboxField,
  'yesno': YesNoField,
  'radiolist': RadioListField,
  'paragraph': ParagraphField,
  'dropdownlist': DropdownField,
  'checkboxlist': CheckboxListField,
  'grid': GridField,
  'markup': MarkupField,
  'container': Container

}

export const mapField = (field) => {
  // const result = watchEffect(() => {
  try {
    return map[field?.type ?? 'text'] ?? EmptyField
  } catch (e) {
    console.error(e)
    return EmptyField
  }
  /// });
}

export const getFields = () => readonly(Object.values(map))

const defaultvalueFieldResolver = (value: any) => value;

export const useField = (
  props: any,
  resolveValue = defaultvalueFieldResolver
) => {
  const datasource: any = inject("datasource")
  const field = props.field
  const defaultChangeResolver = (resolver: Function) => ({
    get: () => datasource[field.property],
    set: (value: any) => datasource[field.property] = resolver(value)
  })

  const fn = props.changeResolver ?? defaultChangeResolver

  return {
    field,
    index: props.index,
    depth: props.depth,
    fieldAttrs: props.field.attrs,
    valueFieldResolver: (value: String, key: String | Number) => props.field.valueField == 'value' ? value : props.field.valueField == '+key' ? +key : key,
    modelValue: computed(fn(resolveValue)),
    setValue: (key: string, value: any) => datasource[key] = value,
    getValue: (key: string): any => datasource[key]
  };
};