import type { SVGProps } from 'react';

export function HamidMerdjLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="180"
      height="50"
      viewBox="0 0 180 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hamid Merdj Bakery Logo"
      {...props}
    >
      <style>
        {`
          .logo-text-arabic {
            font-family: var(--font-noto-kufi), 'Arial', sans-serif;
            font-size: 28px;
            fill: hsl(var(--primary));
            font-weight: bold;
            text-anchor: middle;
            dominant-baseline: central;
          }
          .logo-text-bakery {
            font-family: 'Georgia', serif;
            font-size: 12px;
            fill: hsl(var(--muted-foreground));
            text-anchor: middle;
            dominant-baseline: central;
          }
        `}
      </style>
      <text x="90" y="20" className="logo-text-arabic">
        حميد مرج
      </text>
      <text x="90" y="40" className="logo-text-bakery">
        BAKERY
      </text>
    </svg>
  );
}
