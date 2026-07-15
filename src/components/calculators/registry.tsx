import type { ComponentType } from "react";
import { AgeCalculator } from "./AgeCalculator";
import { EmiCalculator } from "./EmiCalculator";
import { LoanCalculator } from "./LoanCalculator";
import { BmiCalculator } from "./BmiCalculator";
import { PercentageCalculator } from "./PercentageCalculator";
import { GstVatCalculator } from "./GstVatCalculator";
import { CurrencyConverter } from "./CurrencyConverter";
import { UnitConverter } from "./UnitConverter";
import { TimezoneConverter } from "./TimezoneConverter";
import { ScientificCalculator } from "./ScientificCalculator";
import { DiscountCalculator } from "./DiscountCalculator";
import { TipCalculator } from "./TipCalculator";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { DateDifferenceCalculator } from "./DateDifferenceCalculator";

export const CALCULATOR_COMPONENTS: Record<string, ComponentType> = {
  "age-calculator": AgeCalculator,
  "emi-calculator": EmiCalculator,
  "loan-calculator": LoanCalculator,
  "bmi-calculator": BmiCalculator,
  "percentage-calculator": PercentageCalculator,
  "gst-vat-calculator": GstVatCalculator,
  "currency-converter": CurrencyConverter,
  "unit-converter": UnitConverter,
  "timezone-converter": TimezoneConverter,
  "scientific-calculator": ScientificCalculator,
  "discount-calculator": DiscountCalculator,
  "tip-calculator": TipCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "date-difference-calculator": DateDifferenceCalculator,
};

export const HOW_TO: Record<string, string[]> = {
  "age-calculator": [
    "Enter your date of birth.",
    "Optionally change the “as of” date.",
    "Read exact age plus total days and next birthday countdown.",
  ],
  "emi-calculator": [
    "Enter loan amount, annual interest rate, and tenure in years.",
    "Review monthly EMI, total interest, and total payment.",
  ],
  "loan-calculator": [
    "Enter principal, rate, and term in months.",
    "Add an optional extra monthly payment to see faster payoff.",
    "Scan the amortization preview for the first year.",
  ],
  "bmi-calculator": [
    "Choose metric or imperial units.",
    "Enter height and weight.",
    "Read BMI and WHO category (informational only).",
  ],
  "percentage-calculator": [
    "Pick a mode: percent of, “is what percent”, or percent change.",
    "Enter the two values and read the result instantly.",
  ],
  "gst-vat-calculator": [
    "Choose tax-exclusive or tax-inclusive mode.",
    "Enter amount and tax rate (or use a quick preset).",
    "See net, tax, and gross totals.",
  ],
  "currency-converter": [
    "Enter an amount and choose currencies.",
    "Live mid-market rates load automatically.",
    "Use Swap to reverse the conversion.",
  ],
  "unit-converter": [
    "Select a category such as length, weight, or temperature.",
    "Enter a value and choose from/to units.",
  ],
  "timezone-converter": [
    "Set a date and time in a source time zone.",
    "Multi-select comparison zones.",
    "Read equivalent local times side by side.",
  ],
  "scientific-calculator": [
    "Tap keys to build an expression.",
    "Use functions like sin(, log(, and sqrt( with parentheses.",
    "Press = to evaluate (trig uses degrees).",
  ],
  "discount-calculator": [
    "Enter original price and discount percent.",
    "See savings and final price.",
  ],
  "tip-calculator": [
    "Enter bill amount and tip percent.",
    "Choose how many people are splitting.",
    "See tip, total, and per-person amounts.",
  ],
  "compound-interest-calculator": [
    "Enter starting balance, rate, years, and compounding frequency.",
    "Add an optional contribution each period.",
    "Review future value, contributions, and interest earned.",
  ],
  "date-difference-calculator": [
    "Pick a start and end date.",
    "Read years/months/days plus total days and weeks.",
  ],
};
