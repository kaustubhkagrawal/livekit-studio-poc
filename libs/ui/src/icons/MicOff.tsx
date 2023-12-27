import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {}

const MicOff = (props: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path opacity={0.5} stroke="#fff" d="m2.646 20.646 18-18" />
    <path d="M7 13a5 5 0 1 0 10 0H7Z" fill="#fff" />
    <g filter="url(#a)">
      <rect
        x={9}
        y={6}
        width={6}
        height={10}
        rx={3}
        fill="#fff"
        fillOpacity={0.2}
      />
      <rect
        x={9.1}
        y={6.1}
        width={5.8}
        height={9.8}
        rx={2.9}
        stroke="url(#b)"
        strokeWidth={0.2}
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={9.091}
        y1={5.727}
        x2={14.909}
        y2={15.909}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.4} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <filter
        id="a"
        x={-23}
        y={-26}
        width={70}
        height={74}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={16} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_700_2607"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_700_2607"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-2} />
        <feGaussianBlur stdDeviation={1.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend in2="shape" result="effect2_innerShadow_700_2607" />
      </filter>
    </defs>
  </svg>
);
export { MicOff };
