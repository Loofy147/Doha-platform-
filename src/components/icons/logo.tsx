import type { SVGProps } from 'react';

export function WomenCommerceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="220" // Adjusted width for new text and slightly more space
      height="60"
      viewBox="0 0 220 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WomenCommerce Logo"
      {...props}
    >
      <style>
        {`
          .logo-main-text {
            font-family: var(--font-poppins), sans-serif;
            font-size: 22px; /* Slightly adjusted for new name */
            fill: hsl(var(--primary)); /* Warm Pink */
            font-weight: 700; /* Bold */
            text-anchor: start;
            dominant-baseline: central;
          }
          .logo-tagline-text {
            font-family: var(--font-merriweather), serif;
            font-size: 9px; /* Slightly smaller for longer tagline */
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
      
      {/* Tree/Community Symbol representing women branching out */}
      <g transform="translate(28, 30) scale(0.75)"> {/* Adjusted position and scale */}
        {/* Trunk */}
        <line x1="0" y1="20" x2="0" y2="-10" className="tree-trunk" />
        
        {/* Branch 1 - Left - Female Symbol */}
        <g transform="translate(-15, -15) rotate(-35)">
          <circle cx="0" cy="-6" r="5" className="female-symbol-fill" />
          <line x1="0" y1="-1" x2="0" y2="6" className="female-symbol-stroke" /> {/* Cross base */}
          <line x1="-4" y1="6" x2="4" y2="6" className="female-symbol-stroke" /> {/* Cross arms */}
          <path d="M 7 -8 A 3 3 0 0 1 4 -11" className="leaf-fill" stroke="hsl(var(--accent-yellow))" strokeWidth="1.5" fill="none" />
        </g>
        
        {/* Branch 2 - Top - Female Symbol */}
        <g transform="translate(0, -22)">
          <circle cx="0" cy="-6" r="5.5" className="female-symbol-fill" />
          <line x1="0" y1="-0.5" x2="0" y2="6.5" className="female-symbol-stroke" />
          <line x1="-4.5" y1="6.5" x2="4.5" y2="6.5" className="female-symbol-stroke" />
          <path d="M 0 -16 A 3 3 0 0 1 -3 -19" className="leaf-fill" stroke="hsl(var(--accent-yellow))" strokeWidth="1.5" fill="none" />
        </g>

        {/* Branch 3 - Right - Female Symbol */}
        <g transform="translate(15, -15) rotate(35)">
          <circle cx="0" cy="-6" r="5" className="female-symbol-fill" />
          <line x1="0" y1="-1" x2="0" y2="6" className="female-symbol-stroke" />
          <line x1="-4" y1="6" x2="4" y2="6" className="female-symbol-stroke" />
           <path d="M -7 -8 A 3 3 0 0 0 -4 -11" className="leaf-fill" stroke="hsl(var(--accent-yellow))" strokeWidth="1.5" fill="none" />
        </g>
      </g>

      <text x="60" y="25" className="logo-main-text"> {/* Adjusted x for new symbol width */}
        WomenCommerce
      </text>
      <text x="62" y="45" className="logo-tagline-text"> {/* Adjusted x for new symbol width */}
        Empowering Women Economically
      </text>
    </svg>
  );
}
