import { supabase } from "@/integrations/supabase/client";

const SESSION_ID_KEY = "greenbridge_traffic_session_id";
const LAST_VIEW_KEY = "greenbridge_traffic_last_view";
const STRICT_MODE_DEDUPE_MS = 4000;

function getOrCreateSessionId() {
  try {
    const existing = localStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;

    const sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `gb-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    localStorage.setItem(SESSION_ID_KEY, sessionId);
    return sessionId;
  } catch {
    return `gb-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function isDuplicateView(pagePath: string) {
  try {
    const raw = sessionStorage.getItem(LAST_VIEW_KEY);
    const now = Date.now();
    const current = { pagePath, timestamp: now };

    if (raw) {
      const previous = JSON.parse(raw) as { pagePath?: string; timestamp?: number };
      if (
        previous.pagePath === pagePath &&
        typeof previous.timestamp === "number" &&
        now - previous.timestamp < STRICT_MODE_DEDUPE_MS
      ) {
        return true;
      }
    }

    sessionStorage.setItem(LAST_VIEW_KEY, JSON.stringify(current));
    return false;
  } catch {
    return false;
  }
}

export async function trackPageVisit(pagePath: string) {
  if (typeof window === "undefined") return;
  if (!pagePath.startsWith("/")) return;
  if (isDuplicateView(pagePath)) return;

  const sessionId = getOrCreateSessionId();
  const referrer = document.referrer || null;
  const userAgent = navigator.userAgent || null;

  const { error } = await supabase.from("site_visits").insert({
    page_path: pagePath,
    session_id: sessionId,
    referrer,
    user_agent: userAgent,
  });

  if (error) {
    console.warn("Failed to track page visit", error.message);
  }
}
