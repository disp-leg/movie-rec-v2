export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px 20px 64px",
        backgroundColor: "#F5F5F7",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#1D1D1F",
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        A film list, not an algorithm
      </p>
      <p
        style={{
          fontSize: 13,
          color: "#6E6E73",
          lineHeight: 1.4,
        }}
      >
        Seeded from The Divide (2011, dir. Xavier Gens)
      </p>
    </footer>
  );
}
