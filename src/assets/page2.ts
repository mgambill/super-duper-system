import { Page, Field, PanelField, CheckboxListField, YesNoField, NumericField, Option } from '../classes'

const fields: Field[] = [
  CreateBasicInfoPanel()
]

const page = Page.create(f => {
  f.id = "100"
  f.template = "main"
  f.slots["main"] = fields
})
console.log(page)
export default [page]

function CreateBasicInfoPanel() {
  return PanelField.create({
    label: "Basic Info",
    fields: [
      CheckboxListField.create(f => {
        f.label = "What is the loan's purpose?";
        f.valueField = "value";
        f.property = "Purposes";
        f.otherProperty = "OtherPurposeTypeDescription";
        f.allowOther = true;
        f.allowOtherValue = true;
        f.withOptions({
          "1": "Acquisition",
          "2": "Refinancing",
          "3": "Construction"
        })
      }),
      YesNoField.create(f => {
        f.label = "Secured or unsecured?";
        f.property = "IsSecured";
        f.yesText = "Secured";
        f.noText = "Unsecured";
      }),
      NumericField.create(f => {
        f.prefix = "$";
        f
          .withLabel("Total loan commitment:")
          .withProperty("Commitment")
          .withAttr("placeholder", "$000,000.00");
      }),
      YesNoField.create(f => f.withLabel("CMBS load?").withProperty("IsCMBS"))
    ]
  })
}