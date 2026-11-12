import React, { useEffect, useMemo, useRef, useState } from "react";
import { GITHUB, GITHUB_USER } from "../data/site";
import "../assets/styles/GithubActivity.scss";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Payload = { total: number; days: Day[]; fetched: number };

const API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
const CACHE_KEY = "gh-contrib-v1";
const CACHE_MS = 6 * 60 * 60 * 1000; // refresh at most every 6 h

const readCache = (): Payload | null => { try { const v = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); return v?.days?.length ? v : null; } catch { return null; } };
const writeCache = (p: Payload) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(p)); } catch { /* private mode */ } };

// Dates are plain YYYY-MM-DD; parse as UTC so the weekday never shifts with the visitor's timezone.
const utc = (d: string) => new Date(`${d}T00:00:00Z`);
const fmtDay = (d: string, lang: string) => utc(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const fmtMonth = (d: string, lang: string) => utc(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { month: "short", timeZone: "UTC" });

function GithubActivity({ language = "en" }: { language?: "en" | "fr" }) {
  const fr = language === "fr";
  const [data, setData] = useState<Payload | null>(() => readCache());
  const [state, setState] = useState<"loading" | "ok" | "error">(() => (readCache() ? "ok" : "loading"));
  const [tip, setTip] = useState<{ x: number; y: number; day: Day } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.fetched < CACHE_MS) return;
    const ctl = new AbortController();
    fetch(API, { signal: ctl.signal })
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((j) => {
        const days: Day[] = j.contributions;
        const p: Payload = { total: j.total?.lastYear ?? days.reduce((a, d) => a + d.count, 0), days, fetched: Date.now() };
        writeCache(p); setData(p); setState("ok");
      })
      .catch((e) => { if (e.name !== "AbortError" && !cached) setState("error"); });
    return () => ctl.abort();
  }, []);

  // Start scrolled to the most recent weeks on narrow screens.
  useEffect(() => { const s = scroller.current; if (s) s.scrollLeft = s.scrollWidth; }, [data]);

  const stats = useMemo(() => {
    if (!data) return null;
    const d = data.days;
    let longest = 0, run = 0;
    d.forEach((x) => { run = x.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); });
    let i = d.length - 1;
    if (d[i] && d[i].count === 0) i--; // today may not have a contribution yet
    let current = 0;
    while (i >= 0 && d[i].count > 0) { current++; i--; }
    const best = d.reduce((a, b) => (b.count > a.count ? b : a), d[0]);
    const active = d.filter((x) => x.count > 0).length;
    return { total: data.total, active, current, longest, best };
  }, [data]);

  // Weeks as columns (Sunday first), padded at the start so rows line up with weekdays.
  const { weeks, months } = useMemo(() => {
    const cells: (Day | null)[] = [];
    if (data) {
      const lead = utc(data.days[0].date).getUTCDay();
      for (let i = 0; i < lead; i++) cells.push(null);
      data.days.forEach((x) => cells.push(x));
    }
    const w: (Day | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) w.push(cells.slice(i, i + 7));
    const m: { col: number; label: string }[] = [];
    let last = "";
    w.forEach((col, ci) => {
      const first = col.find(Boolean);
      if (!first) return;
      const label = fmtMonth(first.date, language);
      if (label !== last && (ci === 0 || utc(first.date).getUTCDate() <= 7)) { m.push({ col: ci, label }); last = label; }
    });
    return { weeks: w, months: m };
  }, [data, language]);

  const last30 = data ? data.days.slice(-30) : [];
  const max30 = Math.max(1, ...last30.map((x) => x.count));

  const showTip = (e: React.PointerEvent | React.FocusEvent, day: Day) => {
    const r = box.current?.getBoundingClientRect();
    const t = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (r) setTip({ x: t.left - r.left + t.width / 2, y: t.top - r.top, day });
  };
  const label = (day: Day) => `${day.count} ${day.count === 1 ? (fr ? "contribution" : "contribution") : fr ? "contributions" : "contributions"} · ${fmtDay(day.date, language)}`;

  return (
    <section className="gh" id="activity">
      <h1>{fr ? "Activité GitHub" : "GitHub Activity"}</h1>
      <p className="skills-lead">
        {fr ? "Mon historique de code en direct : chaque case est un jour, plus elle est vive, plus j'ai contribué." : "My coding history, live: every square is a day — the brighter it is, the more I shipped."}
      </p>

      <div className="gh-card" ref={box}>
        <div className="gh-head">
          <a className="gh-user" href={GITHUB} target="_blank" rel="noreferrer">@{GITHUB_USER} ↗</a>
          <span className="gh-live"><i /> {state === "ok" && data ? (fr ? "En direct · mis à jour " : "Live · updated ") + new Date(data.fetched).toLocaleDateString(fr ? "fr-FR" : "en-GB", { day: "numeric", month: "short" }) : state === "loading" ? (fr ? "Chargement…" : "Loading…") : fr ? "Indisponible" : "Unavailable"}</span>
        </div>

        {state === "error" && (
          <p className="gh-error">
            {fr ? "Impossible de charger les contributions pour l'instant. " : "Couldn't load contributions right now. "}
            <a href={GITHUB} target="_blank" rel="noreferrer">{fr ? "Voir mon profil GitHub ↗" : "View my GitHub profile ↗"}</a>
          </p>
        )}

        {state === "loading" && <div className="gh-skeleton" aria-hidden="true" />}

        {stats && data && (
          <>
            <div className="gh-stats">
              <div><strong>{stats.total}</strong><span>{fr ? "Contributions (12 mois)" : "Contributions (12 mo)"}</span></div>
              <div><strong>{stats.active}</strong><span>{fr ? "Jours actifs" : "Active days"}</span></div>
              <div><strong>{stats.current}</strong><span>{fr ? "Série en cours (jours)" : "Current streak (days)"}</span></div>
              <div><strong>{stats.longest}</strong><span>{fr ? "Plus longue série" : "Longest streak"}</span></div>
              <div><strong>{stats.best.count}</strong><span>{fr ? "Meilleur jour · " : "Best day · "}{fmtDay(stats.best.date, language).replace(/^\w+\.?,? /, "")}</span></div>
            </div>

            <div className="gh-scroll" ref={scroller}>
              <div className="gh-map" style={{ ["--cols" as any]: weeks.length }} onPointerLeave={() => setTip(null)}>
                <div className="gh-months">
                  {months.map((m) => <span key={m.col + m.label} style={{ gridColumn: m.col + 1 }}>{m.label}</span>)}
                </div>
                <div className="gh-grid" role="img" aria-label={fr ? "Calendrier des contributions GitHub" : "GitHub contributions calendar"}>
                  {weeks.map((col, ci) =>
                    col.map((day, ri) =>
                      day ? (
                        <button
                          key={day.date}
                          className={`gh-cell l${day.level}`}
                          style={{ gridColumn: ci + 1, gridRow: ri + 1, animationDelay: `${ci * 14}ms` }}
                          aria-label={label(day)}
                          onPointerEnter={(e) => showTip(e, day)}
                          onFocus={(e) => showTip(e, day)}
                          onBlur={() => setTip(null)}
                        />
                      ) : null
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="gh-legend">
              <span>{fr ? "Moins" : "Less"}</span>
              {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`gh-cell l${l}`} />)}
              <span>{fr ? "Plus" : "More"}</span>
            </div>

            <div className="gh-30">
              <span className="gx-kicker">{fr ? "30 derniers jours — contributions par jour" : "Last 30 days — contributions per day"}</span>
              <div className="gh-bars">
                {last30.map((x) => (
                  <div key={x.date} className="gh-bar" onPointerEnter={(e) => showTip(e, x)} onPointerLeave={() => setTip(null)}>
                    <b>{x.count > 0 ? x.count : ""}</b>
                    <i style={{ height: `${Math.max(x.count ? 8 : 3, (x.count / max30) * 100)}%` }} className={x.count ? "on" : ""} />
                    <em>{utc(x.date).getUTCDate()}</em>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tip && (
          <div className="gh-tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
            <b>{tip.day.count}</b> {tip.day.count === 1 ? "contribution" : "contributions"}
            <span>{fmtDay(tip.day.date, language)}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default GithubActivity;
