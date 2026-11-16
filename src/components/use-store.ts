"use client";

import { useSyncExternalStore } from "react";
import { emptyStore, readStore, writeStore, type Store } from "@/lib/progress";

function subscribe(onChange: () => void) {
  window.addEventListener("bd-se-progress", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("bd-se-progress", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useStore() {
  const store = useSyncExternalStore(subscribe, readStore, () => emptyStore);

  function commit(next: Store) {
    writeStore(next);
  }

  return { store, ready: true, commit };
}

export type { Store };
