/**
 * Registry of lazily-mounted page sections.
 *
 * Sections below the fold are code-split and only rendered shortly before they scroll into view.
 * Anything that jumps to a section programmatically (nav links, hero buttons, ticker, timeline tags…)
 * calls `mountUpTo(id)` first, so every section above the target has its real height before we scroll.
 */
export type SectionEntry = {
  id: string;
  el: () => HTMLElement | null;
  ensure: () => Promise<void>; // start loading + mounting; resolves once the component is in React state
  mounted: () => boolean;
  /** false = only mount on demand (near viewport / explicit jump), never in the background idle pass */
  idle?: boolean;
};

const entries = new Map<string, SectionEntry>();

export function registerSection(entry: SectionEntry): () => void {
  entries.set(entry.id, entry);
  return () => { if (entries.get(entry.id) === entry) entries.delete(entry.id); };
}

const nextFrames = (n: number) =>
  new Promise<void>((resolve) => {
    const step = (left: number): void => { if (left <= 0) resolve(); else requestAnimationFrame(() => step(left - 1)); };
    step(n);
    setTimeout(resolve, 120 * n + 200); // never hang in a background tab where rAF is paused
  });

/** Mount every section that comes before `id` in the page (and `id` itself); no id = all sections. */
export async function mountUpTo(id?: string): Promise<void> {
  const target = id ? document.getElementById(id) : null;
  const need = Array.from(entries.values()).filter((e) => {
    if (e.mounted()) return false;
    if (!target) return true;
    const el = e.el();
    return !el || el === target || !!(el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  if (!need.length) return;
  await Promise.all(need.map((e) => e.ensure()));
  await nextFrames(2); // let React commit and the browser lay the sections out
}

/**
 * A few seconds after load, quietly mount the sections nobody has scrolled to yet — one per idle slot, so it never
 * competes with the first paint or with input. This keeps browser find-in-page (Ctrl+F), keyboard navigation and
 * crawlers working across the whole page, and makes later jumps instant.
 */
export function mountRemainingWhenIdle(delayMs = 6000): () => void {
  let timer = 0, cancelled = false;
  const idle = (fn: () => void) => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout: 2500 }); else window.setTimeout(fn, 250);
  };
  const next = () => {
    if (cancelled) return;
    const pending = Array.from(entries.values()).find((e) => !e.mounted() && e.idle !== false);
    if (!pending) return;
    pending.ensure().then(() => idle(next));
  };
  timer = window.setTimeout(() => idle(next), delayMs);
  return () => { cancelled = true; window.clearTimeout(timer); };
}
