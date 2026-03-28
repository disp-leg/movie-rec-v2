export default function WavyUnderline({ width = 120, color = "#0496FF", opacity = 1 }: { width?: number; color?: string; opacity?: number }) {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} fill="none" style={{ opacity }}>
      <path
        d={`M2 8 C${width*0.15} 3, ${width*0.25} 11, ${width*0.4} 6 S${width*0.6} 2, ${width*0.75} 7 S${width*0.9} 10, ${width-2} 5`}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
