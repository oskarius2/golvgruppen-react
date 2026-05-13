import { DEFAULT_PROJECTS } from "../data.jsx";

/** Keeps first occurrence per `id`, else per title+img — avoids duplicate cards on /projekt. */
export function dedupeProjects(projects) {
  if (!Array.isArray(projects)) return [];
  const seen = new Set();
  const out = [];
  for (const p of projects) {
    if (!p || typeof p !== "object") continue;
    const id = p.id;
    const key =
      id != null && String(id).trim() !== ""
        ? `id:${String(id)}`
        : `k:${String(p.title ?? "").trim()}|${String(p.img ?? "").trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

export async function saveQuote(data) {
  try {
    let existing = [];
    try {
      const r = await window.storage.get("gg-quotes");
      if (r) existing = JSON.parse(r.value);
    } catch {
      // empty / invalid existing value is fine
    }
    existing.unshift({ ...data, id: Date.now(), date: new Date().toISOString(), read: false });
    await window.storage.set("gg-quotes", JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}

export async function loadQuotes() {
  try {
    const r = await window.storage.get("gg-quotes");
    return r ? JSON.parse(r.value) : [];
  } catch {
    return [];
  }
}

export async function deleteQuote(id) {
  try {
    const quotes = await loadQuotes();
    await window.storage.set("gg-quotes", JSON.stringify(quotes.filter(q => q.id !== id)));
    return true;
  } catch {
    return false;
  }
}

export async function markRead(id) {
  try {
    const quotes = await loadQuotes();
    const updated = quotes.map(q => q.id === id ? { ...q, read: true } : q);
    await window.storage.set("gg-quotes", JSON.stringify(updated));
  } catch {
    // best effort
  }
}

export async function loadProjects() {
  try {
    const r = await window.storage.get("gg-projects");
    if (!r?.value) return dedupeProjects(DEFAULT_PROJECTS);
    const parsed = JSON.parse(r.value);
    if (!Array.isArray(parsed)) return dedupeProjects(DEFAULT_PROJECTS);
    return dedupeProjects(parsed);
  } catch {
    return dedupeProjects(DEFAULT_PROJECTS);
  }
}

export async function saveProjects(projects) {
  try {
    await window.storage.set("gg-projects", JSON.stringify(dedupeProjects(projects)));
    return true;
  } catch {
    return false;
  }
}
