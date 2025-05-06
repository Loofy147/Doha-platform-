import type { SVGProps } from 'react';

export function AlNisaaMarketLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="200" // Increased width for new text
      height="60" // Increased height for new text
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AlNisaaMarket Logo"
      {...props}
    >
      <style>
        {`
          .logo-main-text {
            font-family: var(--font-poppins), sans-serif;
            font-size: 24px;
            fill: hsl(var(--primary)); /* Warm Pink */
            font-weight: 700; /* Bold */
            text-anchor: start;
            dominant-baseline: central;
          }
          .logo-tagline-text {
            font-family: var(--font-merriweather), serif;
            font-size: 10px;
            fill: hsl(var(--muted-foreground)); /* Muted Purple-Pink */
            text-anchor: start;
            dominant-baseline: central;
          }
          .tree-trunk {
            stroke: hsl(var(--primary)); /* Warm Pink */
            stroke-width: 2;
            fill: none;
          }
          .female-symbol-fill {
            fill: hsl(var(--secondary)); /* Light Purple */
          }
          .female-symbol-stroke {
            stroke: hsl(var(--primary)); /* Warm Pink */
            stroke-width: 1.5;
          }
          .leaf-fill {
            fill: hsl(var(--accent-yellow)); /* Warm Yellow */
          }
        `}
      </style>
      
      {/* Simplified Tree/Community Symbol */}
      <g transform="translate(25, 30) scale(0.7)">
        {/* Trunk */}
        <line x1="0" y1="20" x2="0" y2="-10" className="tree-trunk" />
        
        {/* Branch 1 - Left */}
        <g transform="translate(-15, -15) rotate(-30)">
          <circle cx="0" cy="-5" r="4" className="female-symbol-fill" />
          <line x1="0" y1="-1" x2="0" y2="5" className="female-symbol-stroke" />
          <line x1="-3" y1="5" x2="3" y2="5" className="female-symbol-stroke" />
          <circle cx="5" cy="-10" r="2" className="leaf-fill" />
        </g>
        
        {/* Branch 2 - Top */}
        <g transform="translate(0, -20)">
          <circle cx="0" cy="-5" r="4.5" className="female-symbol-fill" />
          <line x1="0" y1="-0.5" x2="0" y2="5.5" className="female-symbol-stroke" />
          <line x1="-3.5" y1="5.5" x2="3.5" y2="5.5" className="female-symbol-stroke" />
           <circle cx="0" cy="-15" r="2.5" className="leaf-fill" />
        </g>

        {/* Branch 3 - Right */}
        <g transform="translate(15, -15) rotate(30)">
          <circle cx="0" cy="-5" r="4" className="female-symbol-fill" />
          <line x1="0" y1="-1" x2="0" y2="5" className="female-symbol-stroke" />
          <line x1="-3" y1="5" x2="3" y2="5" className="female-symbol-stroke" />
          <circle cx="-5" cy="-10" r="2" className="leaf-fill" />
        </g>
      </g>

      <text x="55" y="25" className="logo-main-text">
        AlNisaaMarket
      </text>
      <text x="57" y="45" className="logo-tagline-text">
        Empowering Women Entrepreneurs
      </text>
    </svg>
  );
}