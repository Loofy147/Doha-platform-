
import type { SVGProps } from 'react';

export function WomenCommerceLogo(props: SVGProps<SVGSVGElement>) {
  // Determine if a compact version is requested, e.g. for sidebar icons
  const isCompact = props.className?.includes('h-8') || props.className?.includes('h-9') || props.className?.includes('h-10');

  return (
    <svg
      width={isCompact ? "40" : "180"} // Adjusted width for "لمسة ضحى"
      height={isCompact ? "40" : "60"}
      viewBox={isCompact ? "0 0 50 50" : "0 0 180 60"} // Adjusted viewBox
      xmlns="http://www.w3.org/2000/svg"
      aria-label="لمسة ضحى Logo"
      {...props}
    >
      <style>
        {`
          .logo-main-text {
            font-family: var(--font-noto-sans-arabic), var(--font-poppins), sans-serif;
            font-size: ${isCompact ? "0" : "28px"}; /* Adjusted size for Arabic */
            fill: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            font-weight: 700;
            text-anchor: ${isCompact ? "middle" : "start"};
          }
          .logo-tagline-text {
            font-family: var(--font-noto-sans-arabic), var(--font-merriweather), serif;
            font-size: ${isCompact ? "0" : "11px"};
            fill: hsl(var(${isCompact ? "--sidebar-foreground" : "--muted-foreground"}));
            text-anchor: ${isCompact ? "middle" : "start"};
          }
          .symbol-stroke {
            stroke: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            stroke-width: ${isCompact ? "2.5" : "2"};
          }
          .symbol-fill-primary {
             fill: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
          }
          .symbol-fill-secondary {
            fill: hsl(var(${isCompact ? "--sidebar-accent" : "--secondary"}));
          }
           .symbol-fill-accent {
            fill: hsl(var(${isCompact ? "--accent-yellow" :"--accent-yellow"}));
          }
        `}
      </style>
      
      {/* Symbol: A stylized 'D' for Dhoha, with a touch (Lamsa) element */}
      <g transform={isCompact ? "translate(25, 25) scale(0.9)" : "translate(30, 30) scale(1)"}>
        {/* Main 'D' shape - could be a crescent or an abstract curve */}
        <path d="M -10 -15 Q 15 -15 15 0 Q 15 15 -10 15 L -10 -15 Z" className="symbol-fill-primary" opacity="0.7"/>
        {/* Touch element - a small circle or sparkle */}
        <circle cx="8" cy="-8" r="4" className="symbol-fill-accent" />
         <path d="M -12 0 A 12 12 0 0 1 0 -12 A 12 12 0 0 1 12 0 A 12 12 0 0 1 0 12 A 12 12 0 0 1 -12 0 Z" stroke="hsl(var(--accent-pink))" strokeWidth="1.5" fill="none" opacity="0.5" >
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite"/>
        </path>
      </g>

      {!isCompact && (
        <>
          <text x="65" y="35" className="logo-main-text">
            لمسة ضحى
          </text>
          {/* Optional tagline, can be removed or kept if simple enough */}
          {/* <text x="67" y="48" className="logo-tagline-text">
            إبداع يلامس حياتك
          </text> */}
        </>
      )}
    </svg>
  );
}
