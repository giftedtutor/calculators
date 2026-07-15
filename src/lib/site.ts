export const SITE = {
  name: "CalcNest",
  tagline: "Fast, accurate calculators for everyday decisions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://calculators.thecodesplitter.com",
  email: "thecodesplitters@gmail.com",
  publisher: "Code Splitters",
} as const;

export type CalculatorCategory =
  | "finance"
  | "health"
  | "math"
  | "convert"
  | "time";

export type CalculatorMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: CalculatorCategory;
  keywords: string[];
};

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "age-calculator",
    title: "Age Calculator",
    shortTitle: "Age",
    description:
      "Calculate exact age in years, months, and days from a date of birth. Free online age calculator with precision down to the day.",
    category: "time",
    keywords: ["age calculator", "how old am I", "date of birth calculator"],
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    shortTitle: "EMI",
    description:
      "Calculate monthly EMI for home, car, and personal loans. See total interest and payment breakdown instantly.",
    category: "finance",
    keywords: ["EMI calculator", "loan EMI", "monthly installment"],
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    shortTitle: "Loan",
    description:
      "Estimate loan payments, total interest, and payoff schedules. Plan borrowing with clarity before you commit.",
    category: "finance",
    keywords: ["loan calculator", "loan payment", "amortization"],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    shortTitle: "BMI",
    description:
      "Compute Body Mass Index from height and weight. Get category guidance using standard WHO ranges.",
    category: "health",
    keywords: ["BMI calculator", "body mass index", "healthy weight"],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    shortTitle: "Percentage",
    description:
      "Find percentages, percentage change, and what percent one number is of another. Simple and precise.",
    category: "math",
    keywords: ["percentage calculator", "percent change", "% of"],
  },
  {
    slug: "gst-vat-calculator",
    title: "GST / VAT Calculator",
    shortTitle: "GST / VAT",
    description:
      "Add or remove GST and VAT from any amount. Support custom tax rates for invoices and pricing.",
    category: "finance",
    keywords: ["GST calculator", "VAT calculator", "tax inclusive"],
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    shortTitle: "Currency",
    description:
      "Convert between world currencies with live mid-market exchange rates. Quick and reliable.",
    category: "convert",
    keywords: ["currency converter", "exchange rate", "USD to EUR"],
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    shortTitle: "Units",
    description:
      "Convert length, weight, temperature, volume, and more. Accurate unit conversions in one place.",
    category: "convert",
    keywords: ["unit converter", "metric converter", "length weight"],
  },
  {
    slug: "timezone-converter",
    title: "Time Zone Converter",
    shortTitle: "Time Zone",
    description:
      "Compare times across cities and time zones. Schedule meetings without timezone confusion.",
    category: "time",
    keywords: ["timezone converter", "world clock", "meeting time"],
  },
  {
    slug: "scientific-calculator",
    title: "Scientific Calculator",
    shortTitle: "Scientific",
    description:
      "Full scientific calculator with trig, logs, powers, and roots. Built for students and professionals.",
    category: "math",
    keywords: ["scientific calculator", "online calculator", "trig calculator"],
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    shortTitle: "Discount",
    description:
      "Calculate sale prices, savings, and discount percentages. Know exactly what you pay before checkout.",
    category: "finance",
    keywords: ["discount calculator", "sale price", "percent off"],
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    shortTitle: "Tip",
    description:
      "Split bills and calculate tips fairly. Adjust tip percentage and divide among any number of people.",
    category: "finance",
    keywords: ["tip calculator", "bill splitter", "gratuity"],
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    description:
      "Project investment growth with compound interest. Model monthly or yearly contributions over time.",
    category: "finance",
    keywords: ["compound interest", "investment calculator", "savings growth"],
  },
  {
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    shortTitle: "Date Diff",
    description:
      "Find the exact number of days, weeks, months, and years between two dates.",
    category: "time",
    keywords: ["date difference", "days between dates", "date calculator"],
  },
];

export const CATEGORY_LABELS: Record<CalculatorCategory, string> = {
  finance: "Finance",
  health: "Health",
  math: "Math",
  convert: "Converters",
  time: "Time & Dates",
};

export function getCalculator(slug: string) {
  return CALCULATORS.find((c) => c.slug === slug);
}
