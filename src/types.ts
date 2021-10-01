export interface IRule {
  property: string
  id: string
  token: "NotEmpty" | "Empty" | "GreaterThan"
  message: string
  errorcode: string
  ruleSet: string
}
