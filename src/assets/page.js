export default [{
  "id": "100",
  "type": "page",
  "template": "main",
  "slots": {
    "sidebar": [],
    "main": [
      {
        "type": "panel",
        "label": "Basic Info",
        "fields": [
          {
            "type": "checkboxlist",
            "label": "What is the loan's purpose?",
            "property": "Purposes",
            "valueField": "value",
            "allowOther": true,
            "allowOtherValue": true,
            "otherProperty": "OtherPurposeTypeDescription",
            "options": {
              "1": "Acquisition",
              "2": "Refinancing",
              "3": "Construction"
            }
          },
          {
            "type": "yesno",
            "label": "Secured or unsecured?",
            "property": "IsSecured",
            "yesText": "Secured",
            "noText": "Unsecured",
            "nullText": "N/A"
          },
          {
            "type": "numeric",
            "label": "Total loan commitment:",
            "property": "Commitment",
            "prefix": "$",
            "attrs": {
              "placeholder": "$000,000.00"
            }
          },
          {
            "type": "yesno",
            "label": "CMBS load?",
            "property": "IsCMBS",
            "yesText": "Yes",
            "noText": "No",
            "nullText": "N/A"
          }
        ]
      },
      {
        "type": "panel",
        "label": "Economics",
        "fields": [
          {
            "type": "radiobuttonlist",
            "label": "What is the loan's purpose?",
            "property": "RateType",
            "valueField": "value",
            "otherProperty": "OtherPurposeTypeDescription",
            "options": {
              "1": "Fixed",
              "2": "Floating",
              "3": "Fixed/Floating (Combo)"
            }
          },
          {
            "type": "radiobuttonlist",
            "label": "Benchmark type",
            "property": "BenchmarkType",
            "valueField": "value",
            "otherProperty": "BenchmarkDescription",
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
                "type": "numeric",
                "label": "Benchmark Duration",
                "property": "BenchmarkDuration",
                "suffix": "months",
                "attrs": {
                  "min": "0"
                }
              },
              {
                "type": "numeric",
                "label": "Benchmark at Closing",
                "property": "BenchmarkAtClosing",
                "suffix": "%",
                "attrs": {
                  "placeholder": "0.000%"
                }
              },
              {
                "type": "numeric",
                "label": "Credit Spread",
                "property": "CreditSpread",
                "suffix": "%",
                "attrs": {
                  "placeholder": "0.000%"
                }
              }
            ]
          },
          {
            "type": "radiobuttonlist",
            "label": "Floor type",
            "property": "FloorType",
            "valueField": "value",
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
                "type": "numeric",
                "label": "Origination fee",
                "property": "OriginationFee",
                "suffix": "%",
                "attrs": {
                  "placeholder": "0.000%"
                }
              },
              {
                "type": "numeric",
                "label": "All-in interest rate",
                "property": "AllInRate",
                "suffix": "%",
                "attrs": {
                  "placeholder": "0.000%"
                }
              }
            ]
          },
          {
            "type": "radiobuttonlist",
            "label": "Type of amortization",
            "property": "AmortizationType",
            "valueField": "value",
            "options": {
              "1": "Interest Only",
              "2": "Amortizing"
            }
          }
        ]
      },
      {
        "type": "panel",
        "label": "Timing",
        "fields": [
          {
            "type": "content",
            "content": "Use detailed timing (accrual period, payment date etc.)?"
          },
          {
            "type": "column",
            "fields": [
              {
                "type": "date",
                "label": "Origination Date",
                "property": "OriginationDate",
                "defaultValue": "10/01/2021"
              },
              {
                "type": "numeric",
                "label": "Loan Term (months)",
                "property": "Term",
                "defaultValue": 60
              },
              {
                "type": "date",
                "label": "Initial Maturity",
                "property": "InitialMaturity",
                "defaultValue": "10/01/2021"
              }
            ]
          },
          {
            "type": "grid",
            "addText": "ADD EXTENSION",
            "emptyText": "No extensions added  yet",
            "cells": [
              {
                "type": "gridcell",
                "label": "Ext Term (Min)",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "ExtensionTermMin",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "Debt Yield (Min)",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "DebtYieldMin",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "DSCR (Min)",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "DSCRMin",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "LTV Max",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "LTVMax",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "Extension Fee",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "ExtensionFee",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "Spread Increase",
                "fields": [
                  {
                    "type": "numeric",
                    "property": "SpreadIncrease",
                    "suffix": "%"
                  }
                ]
              },
              {
                "type": "gridcell",
                "label": "Ext. Maturity (Est.)",
                "fields": [
                  {
                    "type": "date",
                    "property": "ExtendedMaturityDate",
                    "defaultValue": "2026-11-01"
                  }
                ]
              }
            ],
            "property": "LoanExtensions"
          }
        ]
      }
    ]
  },
  "fields": []
}]