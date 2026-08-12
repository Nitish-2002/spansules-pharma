/**
 * Hero artwork: a two-tone capsule drawn entirely from the theme variables,
 * so it re-colours the moment the admin activates a different theme.
 */
export default function CapsuleVisual({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 440"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="capsule-clip">
          <rect x="110" y="178" width="220" height="84" rx="42" />
        </clipPath>
        <linearGradient id="capsule-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Orbit rings */}
      <circle
        cx="220"
        cy="220"
        r="176"
        fill="none"
        stroke="var(--hairline-strong)"
        strokeWidth="1"
        strokeDasharray="2 8"
      />
      <circle cx="220" cy="220" r="132" fill="none" stroke="var(--hairline)" strokeWidth="1" />
      <circle
        cx="220"
        cy="220"
        r="96"
        fill="rgb(var(--primary-rgb) / 0.05)"
        stroke="var(--hairline)"
        strokeWidth="1"
      />

      {/* Orbit nodes */}
      <circle cx="220" cy="44" r="5" fill="var(--primary-color)" />
      <circle cx="396" cy="220" r="3.5" fill="var(--primary-color)" opacity="0.55" />
      <circle cx="220" cy="396" r="3.5" fill="var(--primary-color)" opacity="0.35" />

      <g transform="rotate(-34 220 220)">
        <g clipPath="url(#capsule-clip)">
          <rect x="110" y="178" width="112" height="84" fill="var(--primary-color)" />
          <rect x="222" y="178" width="108" height="84" fill="var(--secondary-color)" />
          {/* Pellets in the translucent half */}
          <g fill="var(--primary-color)" opacity="0.4">
            <circle cx="248" cy="200" r="6" />
            <circle cx="272" cy="222" r="8" />
            <circle cx="252" cy="240" r="5" />
            <circle cx="294" cy="204" r="5" />
            <circle cx="300" cy="234" r="7" />
            <circle cx="276" cy="192" r="4" />
          </g>
          <rect x="110" y="178" width="220" height="30" fill="url(#capsule-sheen)" />
        </g>
        <rect
          x="110"
          y="178"
          width="220"
          height="84"
          rx="42"
          fill="none"
          stroke="rgb(var(--primary-rgb) / 0.35)"
          strokeWidth="1.5"
        />
        <line
          x1="222"
          y1="178"
          x2="222"
          y2="262"
          stroke="rgb(var(--primary-rgb) / 0.25)"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
