import type { ItemState, Store } from "./types";

export const STORAGE_KEY = "bd-se-study-v1";
export const THEME_KEY = "bd-se-theme";

export const emptyStore: Store = { version: 1, items: {} };

function isItem(value: unknown): value is ItemState {
  if (!value || typeof value !== "object") return false;
  const item = value as ItemState;
  return (
    (item.status === "seen" ||
      item.status === "familiar" ||
      item.status === "unfamiliar") &&
    typeof item.bookmarked === "boolean" &&
    typeof item.draft === "string" &&
    typeof item.updatedAt === "string"
  );
}

let cachedRaw: string | null | undefined;
let cachedStore: Store = emptyStore;

export function readStore(): Store {
  if (typeof window === "undefined") return emptyStore;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedStore;
    cachedRaw = raw;
    if (!raw) {
      cachedStore = emptyStore;
      return cachedStore;
    }
    const parsed = JSON.parse(raw) as Store;
    if (!parsed || parsed.version !== 1 || !parsed.items) {
      cachedStore = emptyStore;
      return cachedStore;
    }
    const items: Store["items"] = {};
    for (const [id, item] of Object.entries(parsed.items)) {
      if (isItem(item)) items[id] = item;
    }
    cachedStore = { version: 1, items };
    return cachedStore;
  } catch {
    cachedRaw = undefined;
    cachedStore = emptyStore;
    return cachedStore;
  }
}

export function writeStore(store: Store) {
  const raw = JSON.stringify(store);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedStore = store;
  window.dispatchEvent(new Event("bd-se-progress"));
}

export function blankItem(): ItemState {
  return {
    status: "seen",
    bookmarked: false,
    draft: "",
    updatedAt: new Date().toISOString(),
  };
}

export function updateItem(
  store: Store,
  id: string,
  patch: Partial<ItemState>,
): Store {
  const current = store.items[id] ?? blankItem();
  return {
    version: 1,
    items: {
      ...store.items,
      [id]: { ...current, ...patch, updatedAt: new Date().toISOString() },
    },
  };
}

export type { Store };

export function summarise(store: Store, ids: string[]) {
  let familiar = 0;
  let unfamiliar = 0;
  let seen = 0;
  let bookmarks = 0;
  for (const id of ids) {
    const item = store.items[id];
    if (!item) continue;
    if (item.bookmarked) bookmarks += 1;
    if (item.status === "familiar") familiar += 1;
    else if (item.status === "unfamiliar") unfamiliar += 1;
    else seen += 1;
  }
  return { familiar, unfamiliar, seen, bookmarks, touched: familiar + unfamiliar + seen };
}
