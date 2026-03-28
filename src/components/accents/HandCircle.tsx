export default function HandCircle({ width = 80, height = 40, color = "#0496FF", opacity = 1 }: { width?: number; height?: number; color?: string; opacity?: number }) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - 4;
  const ry = height / 2 - 4;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ opacity, position: 'absolute', top: '-8px', left: '-8px' }}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" fill="none" transform={`rotate(-3 ${cx} ${cy})`} />
    </svg>
  );
}
