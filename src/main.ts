import { createApp } from 'vue'
import App from './App.vue'
import Layout from "./layouts/Layout.vue";
import router from './plugins/router'

import BaseTextField from "./fields/components/BaseTextField.vue"
import CheckboxField from "./fields/components/CheckboxField.vue"
import CheckboxListField from "./fields/components/CheckboxListField.vue"
import DateField from "./fields/components/DateField.vue"
import DropdownField from "./fields/components/DropdownField.vue"
import EmptyField from "./fields/components/EmptyField.vue"
import GridField from "./fields/components/GridField.vue"
import LabelField from "./fields/components/LabelField.vue"
import MarkupField from "./fields/components/MarkupField.vue"
import NumericField from "./fields/components/NumericField.vue"
import ParagraphField from "./fields/components/ParagraphField.vue"
import RadioListField from "./fields/components/RadioListField.vue"
import TextField from "./fields/components/TextField.vue"
import YesNoField from "./fields/components/YesNoField.vue"
import Container from "./fields/Container.vue"


import "./assets/tailwind.css"

createApp(App)
  .component('Layout', Layout)
  .component('BaseTextField', BaseTextField)
  .component('CheckboxField', CheckboxField)
  .component('CheckboxListField', CheckboxListField)
  .component('DateField', DateField)
  .component('DropdownField', DropdownField)
  .component('EmptyField', EmptyField)
  .component('GridField', GridField)
  .component('LabelField', LabelField)
  .component('MarkupField', MarkupField)
  .component('NumericField', NumericField)
  .component('ParagraphField', ParagraphField)
  .component('RadioListField', RadioListField)
  .component('TextField', TextField)
  .component('YesNoField', YesNoField)
  .component('Container', Container)
  .use(router)
  .mount('#app')
