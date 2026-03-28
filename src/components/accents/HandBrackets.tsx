export default function HandBrackets({ height = 36, color = "#0496FF", opacity = 1 }: { height?: number; color?: string; opacity?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity }}>
      <svg width="12" height={height} viewBox={`0 0 12 ${height}`} fill="none">
        <path d={`M10 2 C4 2, 3 ${height*0.3}, 3 ${height/2} S4 ${height-2}, 10 ${height-2}`} stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}
