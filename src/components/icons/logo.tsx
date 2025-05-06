
import type { SVGProps } from 'react';

export function WomenCommerceLogo(props: SVGProps<SVGSVGElement>) {
  // Determine if a compact version is requested, e.g. for sidebar icons
  const isCompact = props.className?.includes('h-8') || props.className?.includes('h-9') || props.className?.includes('h-10');

  return (
    <svg
      width={isCompact ? "40" : "200"} 
      height={isCompact ? "40" : "50"}
      viewBox={isCompact ? "0 0 50 50" : "0 0 200 50"} // Adjusted viewBox for compact
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WomenCommerce Logo"
      {...props}
    >
      <style>
        {`
          .logo-main-text {
            font-family: var(--font-poppins), sans-serif;
            font-size: ${isCompact ? "18px" : "20px"};
            fill: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            font-weight: 700;
            /* text-anchor: ${isCompact ? "middle" : "start"}; */
            /* dominant-baseline: central; */
          }
          .logo-tagline-text {
            font-family: var(--font-merriweather), serif;
            font-size: ${isCompact ? "0" : "8px"}; /* Hide tagline in compact */
            fill: hsl(var(${isCompact ? "--sidebar-foreground" : "--muted-foreground"}));
            /* text-anchor: ${isCompact ? "middle" : "start"}; */
            /* dominant-baseline: central; */
          }
          .symbol-stroke {
            stroke: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            stroke-width: 1.5;
          }
          .symbol-fill-secondary {
            fill: hsl(var(${isCompact ? "--sidebar-accent" : "--secondary"}));
          }
           .symbol-fill-accent {
            fill: hsl(var(--accent-yellow));
          }
        `}
      </style>
      
      {/* Simplified Symbol for Compact View / Main Symbol */}
      <g transform={isCompact ? "translate(25, 25) scale(0.9)" : "translate(25, 25) scale(0.8)"}>
        {/* Main circle representing community/unity */}
        <circle cx="0" cy="0" r="18" className="symbol-fill-secondary" opacity="0.3"/>
        
        {/* Stylized 'W' or abstract representation of commerce/connection */}
        <path d="M -12 -8 L -6 8 L 0 -2 L 6 8 L 12 -8" className="symbol-stroke" strokeWidth="2.5" fill="none" />

        {/* Small accent dot */}
         {!isCompact && <circle cx="0" cy="-15" r="3" className="symbol-fill-accent"/>}
         {isCompact && <circle cx="0" cy="0" r="4" className="symbol-fill-accent"/>}

      </g>

      {!isCompact && (
        <>
          <text x="55" y="20" className="logo-main-text">
            WomenCommerce
          </text>
          <text x="57" y="38" className="logo-tagline-text">
            Empowering Women Economically
          </text>
        </>
      )}
    </svg>
  );
}
