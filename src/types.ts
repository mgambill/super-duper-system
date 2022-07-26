import type { Ref, InjectionKey } from "vue"
import type { Evt } from ''
export interface IRule {
  property: string
  id: string
  token: "NotEmpty" | "Empty" | "GreaterThan"
  message: string
  errorcode: string
  ruleSet: string
}

export type ValidationResult = {
  [key: string]: {
    errorCode: keyof ValidationResult;
    errorMessage: string;
    propertyName: string;
    serverity: number;
  };
};

export type ContextItem = {
  [key: string]: {
    error: any[];
    value: any;
  };
};

export type Page = {
  id: string
  type: 'page',
  template: string,
  slots: Record<string, Field[]>
  components: Field[]
}

export type Field = {
  label?: string,
  property: string,
  valueField: string,
  type: 'date' | 'numeric' | 'dropdownlist' | 'grid',
  defaultValue?: DefaultValueResolver,
  options?: { [key: string]: string },
  fields?: Field[],
  attr?: { [key: string]: string },
  cells?: Field[]
  key?: string
}

export type GetValueOptions = { key: string, parent: any, field: Field }
export type SetValueOptions = { key: string, value: any | null, parent: any, field: Field }


export type DefaultValueResolver = string | number | Date | ((context: any) => Ref<any> | string | number | Date)
export type ModelResolver = () => { get: () => any, set: (value: any) => any }
export type Props = {
  field: Field
  index: number
  modelResolver: ModelResolver
}


export type FieldOptions = {
  enter: (v: any) => any;
  leave: (v: any) => any;
  initialValue: any
};

export type PageState = {
  datasource: Record<string, any>;
  page: Record<string, any> | undefined;
  actions: { task: string; params: any[] }[];
  evt: Evt<Action>
};


export type Action = {
  task: string
  params: any[]
}

export const pageProvideKey = Symbol() as InjectionKey<PageState>;