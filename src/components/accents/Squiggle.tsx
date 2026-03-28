export default function Squiggle({ width = 60, color = "#0496FF", opacity = 0.4 }: { width?: number; color?: string; opacity?: number }) {
  return (
    <svg width={width} height="8" viewBox={`0 0 ${width} 8`} fill="none" style={{ opacity }}>
      <path d={`M2 4 Q${width*0.1} 1, ${width*0.2} 4 T${width*0.4} 4 T${width*0.6} 4 T${width*0.8} 4 T${width-2} 4`} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
