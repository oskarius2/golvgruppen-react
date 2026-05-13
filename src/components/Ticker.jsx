export default function Ticker() {
  const items = Array.from({ length: 12 }, () => "GolvGruppen");
  const all = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {all.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot"/>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
