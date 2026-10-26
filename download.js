// Fills the Download button from the newest release's latest.json (version, url, size, sha256, released).

export function formatSize(bytes) {
  return bytes > 0 ? `${(bytes / 1_000_000).toFixed(1)} MB` : "";
}

/** Before the first release: no latest.json on the site. */
export function noReleaseView() {
  return { label: "No release yet", meta: "", href: null, disabled: true };
}

/** latest.json could not be read (offline, server error). */
export function unavailableView() {
  return { label: "Download unavailable", meta: "Try again later or open the releases page.", href: null, disabled: true };
}

/** The button for a manifest; a manifest without a version or an https url counts as no release. */
export function viewFor(manifest) {
  if (!manifest || !manifest.version || typeof manifest.url !== "string" || !manifest.url.startsWith("https://")) {
    return noReleaseView();
  }
  const meta = [`Version ${manifest.version}`, formatSize(manifest.size), manifest.released && `released ${manifest.released}`];
  return { label: "Download for macOS", meta: meta.filter(Boolean).join(" · "), href: manifest.url, disabled: false };
}

export async function loadView(fetchFn) {
  try {
    const response = await fetchFn("latest.json", { cache: "no-cache" });
    if (response.status === 404) return noReleaseView();
    if (!response.ok) return unavailableView();
    return viewFor(await response.json());
  } catch {
    return unavailableView();
  }
}

/** getById is document.getElementById; the button is an anchor, so "disabled" is aria-disabled plus the design's is-disabled. */
export function applyView(getById, view) {
  const button = getById("download");
  getById("download-label").textContent = view.label;
  getById("download-meta").textContent = view.meta;
  if (view.disabled) {
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
    button.setAttribute("tabindex", "-1");
    button.classList.add("is-disabled");
  } else {
    button.setAttribute("href", view.href);
    button.removeAttribute("aria-disabled");
    button.removeAttribute("tabindex");
    button.classList.remove("is-disabled");
  }
}

if (typeof document !== "undefined") {
  loadView(fetch).then((view) => applyView((id) => document.getElementById(id), view));
}
