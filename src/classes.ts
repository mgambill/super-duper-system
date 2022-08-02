interface ISlots {
  slots: Record<string, Field[]>
}
interface IContent {
  content?: string
}
interface IProperty {
  property?: string
}
interface ILabel {
  label?: string
  helpText?: string
  labelVisible: boolean
}
interface IOptions {
  options: OptionCollection
}
interface IContainer {
  fields: Field[]
}
interface IAttributes {
  attrs?: Readonly<Record<string, string>>
}
interface IProps {
  props?: Readonly<Record<string, any>>
}
interface ITextField {
  prefix?: string
  suffix?: string
}

export type Action<T> = (item: T) => void
export type OptionCollection  = Record<PropertyKey, string>
export type Option = { value: string | number, label: string }

export abstract class Field implements IAttributes, IProps {

  id?: string;
  type?: string;
  key?: string
  size?: number
  descr?: string
  order?: number
  defaultValue: any
  props?: Record<string, any>
  attrs?: Record<string, string>

  constructor(type: string) {
    this.type = type.replace('Field', '').toLowerCase()
  }

  setDefaultValue(defaultValue: any) {
    return this.configure(this, f => f.defaultValue = defaultValue)
  }

  withProp(key: string, value: any) {
    this.props ??= {}
    this.props[key] = value
    return this;
  }

  withAttr(key: string, value: any) {
    this.attrs ??= {}
    this.attrs[key] = value
    return this;
  }

  withClass(value: any) {
    return this.withAttr('class', value)
  }


  configure<T extends Field>(field: T, setup: Action<T>): T {
    setup(field)
    return field
  }

  // extensions
  protected _withFields<T extends Field & IContainer>(field: T, fields: Field[]): T {
    return field.configure(field, f => f.fields = fields)
  }

  protected _withLabel<T extends Field & ILabel>(field: T, label: string): T {
    return field.configure(field, f => f.label = label)
  }

  protected _withContent<T extends Field & IContent>(field: T, content: string): T {
    return field.configure(field, f => f.content = content)
  }

  protected _withProperty<T extends Field & IProperty>(field: T, property: string): T {
    return field.configure(field, f => f.property = property)
  }

  protected _withOptions<T extends Field & IOptions>(field: T, options: Option[] | Record<PropertyKey, string>): T {
    if (options instanceof Array)
      options.forEach(o => field.options[o.value] = o.label)
    else
      field.options = options
    return field;
  }

}

export class Form extends Field implements IContainer {

  name?: string
  fields: Field[] = []

  constructor() {
    super('Form')
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<Form>) {
    var field = new Form();
    return field.configure(field, setup);
  }
}
export class AddressField extends Field implements IProperty {

  property?: string

  constructor() {
    super('AddressField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  static create(setup: Action<AddressField>) {
    var field = new AddressField();
    return field.configure(field, setup);
  }
}
export class ButtonField extends Field implements ILabel {

  label?: string
  helpText?: string
  labelVisible: boolean = false

  constructor() {
    super('ButtonField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<ButtonField>) {
    var field = new ButtonField();
    return field.configure(field, setup);
  }
}
export class CheckboxListField extends Field implements ILabel, IOptions, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  valueField?: string
  allowOther: boolean = false
  allowOtherValue: boolean = false
  otherProperty?: string
  repeatColumns?: number
  options: OptionCollection = {}

  constructor() {
    super('CheckboxListField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withOptions(options: Option[] | Record<string, string> ) {
    return super._withOptions(this, options)
  }


  static create(setup: Action<CheckboxListField>) {
    var field = new CheckboxListField();
    return field.configure(field, setup);
  }
}
export class ConsentField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('ConsentField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<ConsentField>) {
    var field = new ConsentField();
    return field.configure(field, setup);
  }
}
export class ContainerField extends Field implements IContainer {

  fields: Field[] = []

  constructor() {
    super('ContainerField')
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<ContainerField>) {
    var field = new ContainerField();
    return field.configure(field, setup);
  }
}
export class ContentField extends Field implements ILabel, IContent {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  content?: string
  contentType: 'Text' | 'HTML' | 'Markdown' | 'Json' = 'Text'

  constructor() {
    super('ContentField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withContent(content: string) {
    return super._withContent(this, content)
  }

  static create(setup: Action<ContentField>) {
    var field = new ContentField();
    return field.configure(field, setup);
  }
}
export class DateField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('DateField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<DateField>) {
    var field = new DateField();
    return field.configure(field, setup);
  }
}
export class DateTimePicker extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('DateTimePicker')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<DateTimePicker>) {
    var field = new DateTimePicker();
    return field.configure(field, setup);
  }
}
export class DividerField extends Field implements ILabel {

  label?: string
  helpText?: string
  labelVisible: boolean = false

  constructor() {
    super('DividerField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<DividerField>) {
    var field = new DividerField();
    return field.configure(field, setup);
  }
}
export class DropdownField extends Field implements ILabel, IOptions, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  options: OptionCollection = {}

  constructor() {
    super('DropdownField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withOptions(options: Option[] | Record<string, string> ) {
    return super._withOptions(this, options)
  }

  static create(setup: Action<DropdownField>) {
    var field = new DropdownField();
    return field.configure(field, setup);
  }
}
export class GridField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  addText?: string
  emptyText?: string
  cells: GridCellField[] = []
  property?: string

  constructor() {
    super('GridField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<GridField>) {
    var field = new GridField();
    return field.configure(field, setup);
  }
}
export class GridCellField extends Field implements ILabel, IContainer {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  fields: Field[] = []

  constructor() {
    super('GridCellField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<GridCellField>) {
    var field = new GridCellField();
    return field.configure(field, setup);
  }
}
export class HeadingField extends Field implements ILabel {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  fontSize: 'ExtraSmall' | 'Small' | 'Normal' | 'Large' | 'ExtraLarge' | 'DoubleLarge' | 'TripleLarge' = 'Normal'
  fontWeight: 'Thin' | 'ExtraLight' | 'Light' | 'Normal' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold' = 'Normal'
  alignment: 'Left' | 'Right' | 'Center' = 'Left'

  constructor() {
    super('HeadingField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<HeadingField>) {
    var field = new HeadingField();
    return field.configure(field, setup);
  }
}
export class LabelField extends Field implements ILabel {

  label?: string
  helpText?: string
  labelVisible: boolean = false

  constructor() {
    super('LabelField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<LabelField>) {
    var field = new LabelField();
    return field.configure(field, setup);
  }
}
export class MultiSelectField extends Field implements ILabel, IOptions, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  options: OptionCollection = {}

  constructor() {
    super('MultiSelectField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withOptions(options: Option[] | Record<string, string> ) {
    return super._withOptions(this, options)
  }

  static create(setup: Action<MultiSelectField>) {
    var field = new MultiSelectField();
    return field.configure(field, setup);
  }
}
export class NumericField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  placeholder?: string

  constructor() {
    super('NumericField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<NumericField>) {
    var field = new NumericField();
    return field.configure(field, setup);
  }
}
export class PanelField extends Field implements IContainer {

  label?: string
  helpText?: string
  fields: Field[] = []

  constructor() {
    super('PanelField')
  }

  withLabel(label: string) {
    return super.configure(this, f => f.label = label)
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create({ label, fields }: { label: string, fields: Field[] }) {
    var field = new PanelField();
    return field.configure(field, f => f.withLabel(label).withFields(fields));
  }
}
export class ParagraphField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  placeholder?: string
  rows?: number
  cols?: number

  constructor() {
    super('ParagraphField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<ParagraphField>) {
    var field = new ParagraphField();
    return field.configure(field, setup);
  }
}
export class PasswordField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('PasswordField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<PasswordField>) {
    var field = new PasswordField();
    return field.configure(field, setup);
  }
}
export class RadioButtonListField extends Field implements ILabel, IOptions, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  options: OptionCollection = {}
  valueField?: string
  allowOther: boolean = false
  allowOtherValue: boolean = false
  otherProperty?: string
  repeatColumns?: number

  constructor() {
    super('RadioButtonListField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withOptions(options: Option[] | Record<string, string> ) {
    return super._withOptions(this, options)
  }

  static create(setup: Action<RadioButtonListField>) {
    var field = new RadioButtonListField();
    return field.configure(field, setup);
  }
}
export class RatingField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('RatingField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<RatingField>) {
    var field = new RatingField();
    return field.configure(field, setup);
  }
}
export class RepeaterField extends Field implements ILabel, IContainer {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  fields: Field[] = []

  constructor() {
    super('RepeaterField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<RepeaterField>) {
    var field = new RepeaterField();
    return field.configure(field, setup);
  }
}
export class RowField extends Field implements IContainer {

  fields: Field[] = []

  constructor() {
    super('RowField')
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<RowField>) {
    var field = new RowField();
    return field.configure(field, setup);
  }
}
export class ColumnField extends Field implements IContainer {

  fields: Field[] = []

  constructor() {
    super('ColumnField')
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<ColumnField>) {
    var field = new ColumnField();
    return field.configure(field, setup);
  }
}
export class ScaleListField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  firstLabel?: string
  lastLabel?: string
  min?: number
  max?: number

  constructor() {
    super('ScaleListField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<ScaleListField>) {
    var field = new ScaleListField();
    return field.configure(field, setup);
  }
}
export class TextField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  prefix?: string
  suffix?: string
  placeholder?: string
  textType: 'Text' | 'Website' | 'Email' | 'Phone' = 'Text'

  constructor() {
    super('TextField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<TextField>) {
    var field = new TextField();
    return field.configure(field, setup);
  }
}
export class TimeField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('TimeField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<TimeField>) {
    var field = new TimeField();
    return field.configure(field, setup);
  }
}
export class ToggleField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string

  constructor() {
    super('ToggleField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<ToggleField>) {
    var field = new ToggleField();
    return field.configure(field, setup);
  }
}
export class TypeAheadField extends Field implements ILabel, IOptions, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  options: OptionCollection = {}

  constructor() {
    super('TypeAheadField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withOptions(options: Option[] | Record<string, string> ) {
    return super._withOptions(this, options)
  }

  static create(setup: Action<TypeAheadField>) {
    var field = new TypeAheadField();
    return field.configure(field, setup);
  }
}
export class YesNoField extends Field implements ILabel, IProperty {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  property?: string
  direction: 'Vertical' | 'Horizontal' = 'Vertical'
  allowNull: boolean = false
  yesText: string = "Yes"
  noText: string = "No"
  nullText: string = "N/A"

  constructor() {
    super('YesNoField')
  }

  withProperty(property: string) {
    return super._withProperty(this, property)
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  static create(setup: Action<YesNoField>) {
    var field = new YesNoField();
    return field.configure(field, setup);
  }
}
export class SidebarField extends Field implements ILabel, IContent {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  content?: string

  constructor() {
    super('SidebarField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withContent(content: string) {
    return super._withContent(this, content)
  }

  static create(setup: Action<SidebarField>) {
    var field = new SidebarField();
    return field.configure(field, setup);
  }
}
export class IconField extends Field implements IContent {

  content?: string

  constructor() {
    super('IconField')
  }

  withContent(content: string) {
    return super._withContent(this, content)
  }

  static create(setup: Action<IconField>) {
    var field = new IconField();
    return field.configure(field, setup);
  }
}
export class Page extends Field {

  template?: string
  slots: Record<string, Field[]> = {}

  constructor() {
    super('Page')
  }

  static create(setup: Action<Page>) {
    var field = new Page();
    return field.configure(field, setup);
  }
}
export class AvatarMenuField extends Field implements IContent {

  content?: string

  constructor() {
    super('AvatarMenuField')
  }

  withContent(content: string) {
    return super._withContent(this, content)
  }

  static create(setup: Action<AvatarMenuField>) {
    var field = new AvatarMenuField();
    return field.configure(field, setup);
  }
}
export class NotificationButtonField extends Field implements ILabel, IContent {

  label?: string
  helpText?: string
  labelVisible: boolean = false
  content?: string

  constructor() {
    super('NotificationButtonField')
  }

  withLabel(label: string) {
    return super._withLabel(this, label)
  }

  withContent(content: string) {
    return super._withContent(this, content)
  }

  static create(setup: Action<NotificationButtonField>) {
    var field = new NotificationButtonField();
    return field.configure(field, setup);
  }
}
export class ModalField extends Field implements IContainer {

  content?: string
  title?: string
  hasBackdrop: boolean = false
  fields: Field[] = []

  constructor() {
    super('ModalField')
  }

  withFields<T extends Field[]>(fields: Field[]) {
    return super._withFields(this, fields)
  }

  static create(setup: Action<ModalField>) {
    var field = new ModalField();
    return field.configure(field, setup);
  }
}
