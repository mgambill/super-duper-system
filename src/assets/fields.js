import { addMonths } from "date-fns"
export default [
  {
    "id": "100",
    "type": "page",
    "template": "main",
    "slots": {
      "sidebar": [
        {
          "type": "loansidebar"
        }
      ],
      "main": [
        {
          "label": "Basic Info",
          "type": "panel",
          "fields": [
            {
              "label": "What is the loan's purpose? let me",
              "type": "checkboxlist",
              "valueField": "value",
              "property": "Purposes",
              "otherProperty": "OtherPurposeTypeDescription",
              "allowOther": true,
              "allowOtherText": true,
              "options": {
                "1": "Acquisition",
                "4": "Refinancing",
                "2": "Construction"
              }
            },
            {
              "label": "Secured or unsecured?",
              "property": "IsSecured",
              "type": "yesno",
              "yesText": "Secured",
              "noText": "Unsecured"
            },
            {
              "label": "Total loan commitment:",
              "property": "Commitment",
              "type": "numeric",
              "prefix": "$",
              "attrs": {
                "placeholder": "$000,000.00"
              }
            },
            {
              "label": "CMBS loan?",
              "property": "IsCMBS",
              "type": "yesno"
            },
            {
              "label": "Show Modal",
              "type": "button",
              action: {
                task: 'ShowModal',
                params: ['add-modal']
              }
            }
          ]
        },
        {
          "label": "Economics",
          "type": "panel",
          "fields": [
            {
              "label": "Rate type",
              "type": "radiolist",
              "valueField": "value",
              "property": "RateType",
              "allowOther": false,
              "allowOtherText": false,
              "options": {
                "1": "Fixed",
                "2": "Floating",
                "3": "Fixed/Floating (Combo)"
              }
            },
            {
              "label": "Benchmark type",
              "type": "radiolist",
              "valueField": "value",
              "property": "BenchmarkType",
              "otherProperty": "BenchmarkDescription",
              "allowOther": true,
              "allowOtherText": true,
              "options": {
                "1": "Treasury",
                "2": "Swap",
                "3": "LIBOR",
                "4": "SOFR",
                "5": "Euribor",
                "6": "BSBY",
                "7": "N/A"
              }
            },
            {
              "type": "column",
              "fields": [
                {
                  "label": "Benchmark Duration",
                  "property": "BenchmarkDuration",
                  "type": "numeric",
                  "suffix": "months"
                },
                {
                  "label": "Benchmark at Closing",
                  "property": "BenchmarkAtClosing",
                  "type": "numeric",
                  "attrs": {
                    "placeholder": "0.000%"
                  },
                  "suffix": "%"
                },
                {
                  "label": "Credit Spread",
                  "property": "CreditSpread",
                  "type": "numeric",
                  "attrs": {
                    "placeholder": "0.000%"
                  },
                  "suffix": "%"
                }
              ]
            },
            {
              "label": "Floor type",
              "type": "radiolist",
              "valueField": "value",
              "property": "FloorType",
              "allowOther": false,
              "allowOtherText": false,
              "options": {
                "1": "None",
                "2": "Benchmark",
                "3": "Coupon"
              }
            },
            {
              "type": "column",
              "fields": [
                {
                  "label": "Origination fee",
                  "property": "OriginationFee",
                  "type": "numeric",
                  "attrs": {
                    "placeholder": "0.000%"
                  },
                  "suffix": "%"
                },
                {
                  "label": "All-in interest rate",
                  "property": "AllInRate",
                  "type": "numeric",
                  "attrs": {
                    "placeholder": "0.000%"
                  },
                  "suffix": "%"
                }
              ]
            },
            {
              "label": "Type of amortization",
              "type": "radiolist",
              "valueField": "value",
              "property": "AmortizationType",
              "allowOther": false,
              "allowOtherText": false,
              "options": {
                "1": "Interest Only",
                "2": "Amortizing"
              }
            }
          ]
        },
        {
          "label": "Timing",
          "type": "panel",
          "fields": [
            {
              "label": "Use detailed timing (accrual period, payment date etc.)?",
              "property": "UseDetailedTiming",
              "type": "yesno"
            },
            {
              "type": "column",
              "fields": [
                {
                  "label": "Origination Date",
                  "property": "OriginationDate",
                  "type": "date",
                  "defaultValue": "10/01/2021"
                },
                {
                  "label": "Loan Term (months)",
                  "property": "Term",
                  "type": "numeric",
                  "defaultValue": 60
                },
                {
                  "label": "Initial Maturity",
                  "property": "InitialMaturity",
                  "type": "date",
                  "defaultValue": "10/01/2026"
                }
              ]
            },
            {
              "type": "grid",
              "property": "LoanExtensions",
              "addText": "ADD EXTENSION",
              "emptyText": "No extensions added yet",
              "cells": [
                {
                  "label": "Ext Term (Min)",
                  "type": "cell",
                  "fields": [
                    {
                      "type": "numeric",
                      "property": "ExtensionTermMin",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "Debt Yield (Min)",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "DebtYieldMin",
                      "type": "numeric",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "DSCR (Min)",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "DSCRMin",
                      "type": "numeric",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "LTV (Max)",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "LTVMax",
                      "type": "numeric",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "Extension Fee",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "ExtensionFee",
                      "type": "numeric",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "Spread Increase",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "SpreadIncrease",
                      "type": "numeric",
                      "suffix": "%"
                    }
                  ]
                },
                {
                  "label": "Ext. Maturity (Est.)",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "ExtendedMaturityDate",
                      "type": "date",
                      "defaultValue": "2026-11-01"
                    }
                  ]
                }
              ]
            },
            {
              "label": "Fully Extended Maturity (Estimate)",
              "property": "FullyExtendedMaturity",
              "type": "date",
              "defaultValue": () => new Date(),
              "attr": {
                "class": "flex justify-end"
              }
            },
            {
              "label": "Notes",
              "type": "markup",
              "property": "TimingNotes"
            }
          ]
        },
        {
          "label": "Call Protection",
          "type": "panel",
          "fields": [
            {
              "type": "grid",
              "property": "CallProtection",
              "addText": "ADD CALL PROTECTION",
              "emptyText": "No call protection added yet",
              "cells": [
                {
                  "label": "Types",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "Type",
                      "valueField": "value",
                      "type": "dropdownlist",
                      "defaultValue": "Lockout",
                      "options": {
                        "1": "Lockout",
                        "12": "Defeasance",
                        "13": "Percent of Balance",
                        "14": "Spread Maintenance",
                        "15": "Yield Maintenance"
                      }
                    }
                  ]
                },
                {
                  "label": "Months",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "Duration",
                      "type": "numeric",
                      "defaultValue": 1
                    }
                  ]
                },
                {
                  "label": "Start Date",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "StartDate",
                      "type": "date",
                      "defaultValue": ({ root, index, rows }) => {
                        console.log("StartDate", { root, index, rows })
                        const prev = index > 0 ? rows[index - 1] : null
                        return prev?.EndDate ?? root.FullyExtendedMaturity
                      }
                    }
                  ]
                },
                {
                  "label": "End Date",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "EndDate",
                      "type": "date",
                      "defaultValue": ({ row }) => {
                        return addMonths(Date.parse(row.StartDate), 1)
                      }
                    }
                  ]
                },
                {
                  "label": "Additional Inputs",
                  "type": "cell",
                  "fields": [
                    {
                      "property": "IncludeBaseRate",
                      "type": "checkbox",
                      "label": "Include Base Rate",
                      "when": {
                        "property": "Type",
                        "token": "EqualTo",
                        "value": "Spread Maintenance"
                      }
                    },
                    {
                      "type": "container",
                      "fields": [
                        {
                          "type": "numeric",
                          "property": "PercentOfBalance",
                          "attrs": {
                            "placeholder": "0.00"
                          },
                          "suffix": "% of Balance"
                        }
                      ],
                      "when": {
                        "property": "Type",
                        "token": "EqualTo",
                        "value": "Percent of Balance"
                      }
                    },
                    {
                      "type": "container",
                      "fields": [
                        {
                          "type": "numeric",
                          "property": "SpreadOverTime",
                          "attrs": {
                            "placeholder": "0.00"
                          },
                          "suffix": "% Spread"
                        },
                        {
                          "type": "numeric",
                          "property": "PercentOfBalance",
                          "attrs": {
                            "placeholder": "0.00"
                          },
                          "suffix": "% of Balance"
                        }
                      ],
                      "when": {
                        "property": "Type",
                        "token": "EqualTo",
                        "value": "Yield Maintenance"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "label": "Covenants",
          "type": "panel",
          "fields": [
            {
              "label": "Ongoing Covenants (Cash Management, Key Completion Dates, etc.)",
              "property": "OngoingCovenants",
              "type": "markup"
            },
            {
              "label": "Closing Covenants (Closing Tests & Other Conditions)",
              "property": "ClosingCovenants",
              "type": "markup"
            }
          ]
        },
        {
          "label": "Debt Stack",
          "type": "panel",
          "fields": [
            {
              "label": "Debt Stack (Senior/Sub, Parl Passu, Lender Splits, etc.)",
              "property": "DebtStack",
              "type": "markup"
            }
          ]
        },
        {
          "label": "Future Funding",
          "type": "panel",
          "fields": [
            {
              "label": "Future Funding, earnout, holdback, etc?",
              "property": "IsFutureFunding",
              "type": "yesno"
            }
          ]
        }
      ]
    },
    "components": [
      {
        "type": "modal",
        "key": "add-modal",
        "fields": [
          {
            "label": "What is the loan's purpose? let me",
            "type": "checkboxlist",
            "valueField": "value",
            "property": "Purposes",
            "otherProperty": "OtherPurposeTypeDescription",
            "allowOther": true,
            "allowOtherText": true,
            "options": {
              "1": "Acquisition",
              "4": "Refinancing",
              "2": "Construction"
            }
          },
        ],
        "title" : "Action",
        "buttons": {
          fields: [
            {
              type: "button",
              label: "Cancel",
              buttonType: 'secondary',
              action: { task: "modal.close" }
            },
            {
              type: "button",
              label: "Update",
              buttonType: 'primary',
              action: (modal, datasource) => {

              }
            }
          ]
        }
      }
    ]
  }
]