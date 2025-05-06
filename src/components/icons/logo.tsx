
import type { SVGProps } from 'react';

export function WomenCommerceLogo(props: SVGProps<SVGSVGElement>) {
  // Determine if a compact version is requested, e.g. for sidebar icons
  const isCompact = props.className?.includes('h-8') || props.className?.includes('h-9') || props.className?.includes('h-10');

  return (
    <svg
      width={isCompact ? "40" : "220"} // Increased width for full logo
      height={isCompact ? "40" : "60"} // Increased height for full logo
      viewBox={isCompact ? "0 0 50 50" : "0 0 220 60"} // Adjusted viewBox
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WomenCommerce Logo"
      {...props}
    >
      <style>
        {`
          .logo-main-text {
            font-family: var(--font-poppins), sans-serif;
            font-size: ${isCompact ? "18px" : "22px"}; /* Adjusted size */
            fill: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            font-weight: 700;
          }
          .logo-tagline-text {
            font-family: var(--font-noto-sans-arabic), var(--font-merriweather), serif; /* Added Noto Sans Arabic */
            font-size: ${isCompact ? "0" : "11px"}; /* Adjusted size */
            fill: hsl(var(${isCompact ? "--sidebar-foreground" : "--muted-foreground"}));
          }
          .symbol-stroke {
            stroke: hsl(var(${isCompact ? "--sidebar-primary" : "--primary"}));
            stroke-width: ${isCompact ? "2" : "1.5"};
          }
          .symbol-fill-secondary {
            fill: hsl(var(${isCompact ? "--sidebar-accent" : "--secondary"}));
          }
           .symbol-fill-accent {
            fill: hsl(var(--accent-yellow));
          }
        `}
      </style>
      
      {/* Symbol */}
      <g transform={isCompact ? "translate(25, 25) scale(0.9)" : "translate(30, 30) scale(1)"}> {/* Adjusted for larger logo */}
        {/* Main circle representing community/unity */}
        <circle cx="0" cy="0" r="18" className="symbol-fill-secondary" opacity="0.4"/>
        
        {/* Stylized 'W' or abstract representation of commerce/connection */}
        <path d="M -12 -8 L -6 8 L 0 -2 L 6 8 L 12 -8" className="symbol-stroke" strokeWidth="2.5" fill="none" />

        {/* Small accent dot */}
         <circle cx="0" cy={isCompact ? "0" : "-15"} r={isCompact ? "4" : "3"} className="symbol-fill-accent"/>
      </g>

      {!isCompact && (
        <>
          <text x="65" y="28" className="logo-main-text">
            WomenCommerce
          </text>
          <text x="67" y="48" className="logo-tagline-text">
            تمكين المرأة اقتصادياً
          </text>
        </>
      )}
    </svg>
  );
}
