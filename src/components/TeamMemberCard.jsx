import { useState } from "react";
import { User } from "lucide-react";

function telHref(tel) {
  const digits = tel.replace(/\D/g, "");
  if (!digits) return "#";
  if (digits.startsWith("0")) return `tel:+46${digits.slice(1)}`;
  return `tel:+${digits}`;
}

export default function TeamMemberCard({ member: m }) {
  const [imgBroken, setImgBroken] = useState(false);
  const showImg = Boolean(m.img && !imgBroken);
  return (
    <article className="team-card">
      <div className="team-ph" aria-hidden={showImg ? undefined : true}>
        {showImg ? (
          <img
            src={m.img}
            alt={`Porträtt: ${m.name}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgBroken(true)}
          />
        ) : (
          <User size={34} strokeWidth={1.5}/>
        )}
      </div>
      <div className="team-meta">
        <h3 className="team-n">{m.name}</h3>
        {m.title ? <p className="team-role">{m.title}</p> : null}
        <a className="team-tel" href={telHref(m.tel)}>{m.tel}</a>
        <a className="team-mail" href={`mailto:${m.email}`}>{m.email}</a>
      </div>
    </article>
  );
}
