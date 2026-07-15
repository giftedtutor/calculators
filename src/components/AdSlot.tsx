type Props = {
  slot?: "header" | "in-article" | "sidebar" | "footer";
  className?: string;
};

/**
 * Placeholder for Google AdSense units.
 * Replace the inner markup with your AdSense <ins> snippet once approved.
 * Kept visually restrained and clearly labeled for policy compliance during review.
 */
export function AdSlot({ slot = "in-article", className = "" }: Props) {
  return (
    <aside
      className={`adsense-slot ${className}`}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <span>Advertisement</span>
    </aside>
  );
}
