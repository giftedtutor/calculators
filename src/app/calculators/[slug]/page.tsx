import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CALCULATOR_COMPONENTS, HOW_TO } from "@/components/calculators/registry";
import { JsonLd, breadcrumbJsonLd, calculatorJsonLd, calculatorMetadata } from "@/lib/seo";
import { CALCULATORS, getCalculator } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  return calculatorMetadata(calc);
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  const Component = CALCULATOR_COMPONENTS[slug];
  if (!calc || !Component) notFound();

  return (
    <>
      <JsonLd
        data={[
          calculatorJsonLd(calc),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: calc.title, path: `/calculators/${calc.slug}` },
          ]),
        ]}
      />
      <CalculatorShell calc={calc} howTo={HOW_TO[slug]}>
        <Component />
      </CalculatorShell>
    </>
  );
}
