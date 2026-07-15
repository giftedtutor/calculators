# CalcNest

Free, responsive online calculators with strong SEO and AdSense-ready legal pages.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — your production URL (canonical, Open Graph, sitemap)
- `NEXT_PUBLIC_ADSENSE_CLIENT` — optional; Google AdSense publisher ID after approval

## Calculators

Age, EMI, Loan, BMI, Percentage, GST/VAT, Currency, Unit, Time Zone, Scientific, plus Discount, Tip, Compound Interest, and Date Difference.

## AdSense / compliance

- Privacy Policy at `/privacy` (includes AdSense / cookie disclosure)
- Terms at `/terms`
- Contact at `/contact` — **thecodesplitters@gmail.com**
- Labeled `AdSlot` placeholders ready to swap for real ad units

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
