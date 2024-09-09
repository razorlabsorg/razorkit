import { useCallback, useEffect } from 'react';

const storageKey = 'rk-version';

function setRazorKitVersion({ version }: { version: string }) {
  localStorage.setItem(storageKey, version);
}

export function useFingerprint() {
  const fingerprint = useCallback(() => {
    setRazorKitVersion({ version: '__buildVersion' });
  }, []);
  useEffect(() => {
    fingerprint();
  }, [fingerprint]);
}
