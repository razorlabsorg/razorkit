import { useState, useEffect } from 'react';

function useLocale() {
  const [locale, setLocale] = useState<string>(() => {
    // Get the browser's language setting
    return navigator.language || 'en'; // Default to 'en' if navigator.language is not available
  });

  useEffect(() => {
    // Update locale if needed, e.g., if browser locale changes (which is rare)
    setLocale(navigator.language || 'en');
  }, []);

  return { locale };
}

export default useLocale;
