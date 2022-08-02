import type { App } from 'vue'
import { readonly, computed, inject, ref, toRaw, Ref, isProxy } from "vue"
import { Field, GetValueOptions, SetValueOptions, FieldOptions, Props, PageState, DefaultValueResolver, ModelResolver } from "../../types"

import BaseTextField from './BaseTextField.vue'
import LabelField from './LabelField.vue'
import TextField from './TextField.vue'
import CheckboxField from './CheckboxField.vue'
import CheckboxListField from './CheckboxListField.vue'
import EmptyField from './EmptyField.vue'

import YesNoField from "./YesNoField.vue"
import RadioListField from "./RadioListField.vue"
import ParagraphField from "./ParagraphField.vue"
import DropdownField from "./DropdownField.vue"

import NumericField from "./NumericField.vue"
import DateField from "./DateField.vue"
import MarkupField from "./MarkupField.vue"
import LiteralField from "./LiteralField.vue"
import ContentField from "./ContentField.vue"

import Container from "../Container.vue"
import GridField from './GridField.vue'

import ModalField from './ModalField.vue'
import ButtonField from './ButtonField.vue'

export const useFields = {
  install(app: App, options: any) {
    app.component('BaseTextField', BaseTextField);
    app.component('CheckboxField', CheckboxField);
    app.component('CheckboxListField', CheckboxListField);
    app.component('DateField', DateField);
    app.component('DropdownField', DropdownField);
    app.component('EmptyField', EmptyField);
    app.component('GridField', GridField);
    app.component('LabelField', LabelField);
    app.component('ContentField', ContentField);
    app.component('MarkupField', MarkupField);
    app.component('NumericField', NumericField);
    app.component('ParagraphField', ParagraphField);
    app.component('RadioListField', RadioListField);
    app.component('TextField', TextField);
    app.component('YesNoField', YesNoField);
    app.component('Container', Container);
    app.component('ModalField', ModalField);
    app.component('ButtonField', ButtonField);
  }
}

const map = {
  'text': TextField,
  'numeric': NumericField,
  'date': DateField,
  'checkbox': CheckboxField,
  'content': ContentField,
  'yesno': YesNoField,
  'radiolist': RadioListField,
  'radiobuttonlist': RadioListField,
  'paragraph': ParagraphField,
  'dropdownlist': DropdownField,
  'checkboxlist': CheckboxListField,
  'grid': GridField,
  'markup': MarkupField,
  'container': Container,
  'literal': LiteralField,
  'modal': ModalField,
  'button': ButtonField

}

export const mapField = (field: Field) => {
  // const result = watchEffect(() => {
  try {
    return map[field?.type ?? 'text'] ?? EmptyField
  } catch (e) {
    console.error(e)
    return EmptyField
  }
  /// });
}

type IDictionary = { [key: string]: any }

export const getFields = () => readonly(Object.values(map))

export const createDatasource = (payload: IDictionary) => {

  let temp: any = {};

  Object.entries(payload).forEach(([key, value]) => {
    temp[key] = {
      value: toRaw(value),
      error: {},
    };
  });

  temp['$created'] = new Date()
  temp['uid'] = +new Date()

  const datasource = ref(temp);
  // const datasource = computed(() => {
  //   let result: any = {};
  //   Object.entries(context.value).forEach(([key, item]) => {
  //     result[key] = item.value;
  //   });
  //   return result;
  // });
  return { datasource }

}

const defaultModels: { field: Field, resolver: ModelResolver }[] = []

export const initialize = () => {
  console.log(defaultModels)
}

export const useField = (props: Props, options: FieldOptions) => {
  //console.log('useField')
  const state = inject<PageState>('PageState') ?? { page: {}, datasource: {} };

  const resolveDefaultValue = (def: DefaultValueResolver, value: any, { key, parent, field }: GetValueOptions) => {
    let v = def

    if (typeof def === 'function') {
      const o = {
        field: toRaw(props.field),
        root: toRaw(state.datasource),
        index: props.index,
        rows: toRaw(state.datasource[props.field.property]),
        row: props.index === undefined ? null : toRaw(parent)
      }
      //console.log("++", { key, field, props, state, parent })
      const rawValue = def(o)
      v = isProxy(rawValue) || isRef(rawValue) ? (rawValue as Ref<any>).value : rawValue
    }
    // we need to update the datastore
    setValue({ key, parent, field, value: v })
    return v;
  }

  const valueFieldResolver = (value: String, key: String | Number) =>
    props.field.valueField == 'value'
      ? value
      : props.field.valueField == '+key'
        ? +key
        : key;

  function getValue({ key, parent, field }: GetValueOptions) {
    field = Coalesce(field, props.field)
    parent = Coalesce(parent, state.datasource)
    let value = parent ? parent[key] : null

    if (value === undefined && field.defaultValue) {
      return resolveDefaultValue(field.defaultValue, value, { key, parent, field })
    }
    return value;
  };

  function setValue({ key, parent, field, value }: SetValueOptions) {
    field = Coalesce(field, props.field)
    parent = Coalesce(parent, state.datasource)
    parent[key] = value;
  }

  const defaultModelResolver = () => ({
    get: () => {
      // console.log('default:ModelValue:get')
      return getValue({
        key: props.field.property,
        parent: state.datasource,
        field: props.field
      });
    },
    set: (value: any) => {
      // console.log('default:ModelValue:set')
      state.datasource[props.field.property] = value
    }
  })

  // todo this concept should be external
  if (props.field.defaultValue) {
    defaultModels.push({ field: props.field, resolver: props.modelResolver ? props.modelResolver : defaultModelResolver })
  }
  if (props.field.property && props.field.type && ['numeric', 'date', 'dropdown', 'checkboxlist'].includes(props.field.type)) {
    if (state.datasource[props.field.property] === undefined) {
      if (options?.initialValue !== undefined)
        state.datasource[props.field.property] = options.initialValue
      if (props.field.property && props.field.defaultValue && typeof (props.field.defaultValue) !== 'function') {
        state.datasource[props.field.property] = props.field.defaultValue
      }
    }
  }

  return {
    field: props.field,
    index: props.index,
    valueFieldResolver,
    getValue,
    setValue: ({ key, value }: { key: string, value: any }) => state.datasource[key ?? props.field.property] = value,
    modelValue: computed(props.modelResolver ? props.modelResolver() : defaultModelResolver())
  }
}

export const isRef = (o: any) => typeof (o) === "object" && o !== null && o.__v_isRef

export const STATUS = {
  empty: "empty",
  loading: "loading",
  error: "error",
  ready: "ready",
  success: "success",
  failure: "failure",
};

export const Coalesce = (...args: any[]) => Array.from(args).find(x => x != null);

export const CoalesceObject = <T>(a: T, b: T): T => {
  const result = {}
  for (const prop in Object.assign({}, a, b)) {
    result[prop] = Coalesce(a == null ? a : a[prop], b == null ? b : b[prop])
  }
  return result as T
}

