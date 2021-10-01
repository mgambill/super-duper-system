type RuleSets = 'basic' | 'economics' | 'timing' | 'call-protection' | 'covenant' | 'debt-stack' | 'future-funding' | 'coverage-team'

interface ValidatorOptions {
  rulesets: RuleSets[] | undefined // the sets of rules you want to run, null/undefined will run all rules
}

interface ValidatorRequest<T> {
  entity: T; // the Loan Contract
  options?: ValidatorOptions;
}

interface ValidationFailure {
  errorCode: string;
  errorMessage: string;
  propertyName: string;
  serverity: Severity
}

enum Severity {
  Error = 0, Warning = 1, Info = 2
}

type ValidatorResponse = {
  [key: string]: ValidationFailure
}

interface Loan {
  /// ....
}

const request: ValidatorRequest<Loan> = {
  entity: {

  },
  options: { rulesets: ['basic'] }
}



const response: ValidatorResponse = {
  "789": {
    "errorCode": "789",
    "errorMessage": "'Is Secured' must not be empty.",
    "propertyName": "IsSecured",
    "serverity": 0
  }
}