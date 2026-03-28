export default function DownArrow({ color = "#0496FF", opacity = 0.5, size = 32 }: { color?: string; opacity?: number; size?: number }) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 20 32" fill="none" style={{ opacity }}>
      <path d="M10 2 L10 26 M4 20 L10 28 L16 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
