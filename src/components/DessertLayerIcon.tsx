import React from 'react';

interface DessertLayerIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Custom 3-Layer Isometric Angled Square Icon for Desertlər
 * Seen from the side-angle / corner perspective with 3 distinct stacked layers:
 * - 1st Layer (Top): White (#FFFFFF)
 * - 2nd Layer (Middle): Amber/Caramel accent (#F59E0B / #D97706)
 * - 3rd Layer (Bottom): White (#FFFFFF)
 */
export const DessertLayerIcon: React.FC<DessertLayerIconProps> = ({
  className = "w-4 h-4",
  size,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      width={size}
      height={size}
      {...props}
    >
      {/* LAYER 1 (Top Layer - White) */}
      <path
        d="M12 2.8L20.5 7.2L12 11.6L3.5 7.2L12 2.8Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="0.5"
      />
      <path
        d="M3.5 7.2L12 11.6V13.8L3.5 9.4V7.2Z"
        fill="#FFFFFF"
      />
      <path
        d="M12 11.6L20.5 7.2V9.4L12 13.8V11.6Z"
        fill="#E2E8F0"
      />

      {/* LAYER 2 (Middle Layer - Filling) */}
      <path
        d="M3.5 9.9L12 14.3V16.3L3.5 11.9V9.9Z"
        fill="#F59E0B"
      />
      <path
        d="M12 14.3L20.5 9.9V11.9L12 16.3V14.3Z"
        fill="#D97706"
      />

      {/* LAYER 3 (Bottom Layer - White) */}
      <path
        d="M3.5 12.4L12 16.8V19.8L3.5 15.4V12.4Z"
        fill="#FFFFFF"
      />
      <path
        d="M12 16.8L20.5 12.4V15.4L12 19.8V16.8Z"
        fill="#E2E8F0"
      />

      {/* Subtle outer outline for perfect definition on white or dark buttons */}
      <path
        d="M12 2.8L20.5 7.2V15.4L12 19.8L3.5 15.4V7.2L12 2.8Z"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.6V19.8"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.6"
      />
    </svg>
  );
};
