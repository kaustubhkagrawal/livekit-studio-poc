import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {}

export const CameraOff = (props: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path opacity={0.5} stroke="#fff" d="m2.646 20.646 18-18" />
    <g filter="url(#a)">
      <rect
        x={5}
        y={7}
        width={10}
        height={10}
        rx={2}
        fill="#fff"
        fillOpacity={0.15}
      />
      <rect
        x={5.1}
        y={7.1}
        width={9.8}
        height={9.8}
        rx={1.9}
        stroke="url(#b)"
        strokeWidth={0.2}
      />
    </g>
    <g filter="url(#c)">
      <path
        d="M16 10.535a1 1 0 0 1 .445-.832l1-.667A1 1 0 0 1 19 9.87v4.263a1 1 0 0 1-1.555.832l-1-.667a1 1 0 0 1-.445-.832v-2.93Z"
        fill="#fff"
      />
    </g>
    <defs>
      <filter
        id="a"
        x={-27}
        y={-25}
        width={74}
        height={74}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={16} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_700_2603"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_700_2603"
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
        <feBlend in2="shape" result="effect2_innerShadow_700_2603" />
      </filter>
      <filter
        id="c"
        x={-16}
        y={-23.133}
        width={67}
        height={70.267}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={16} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_700_2603"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_700_2603"
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
        <feBlend in2="shape" result="effect2_innerShadow_700_2603" />
      </filter>
      <linearGradient
        id="b"
        x1={5.152}
        y1={6.727}
        x2={9.295}
        y2={18.813}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.4} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
