import { useMemo } from 'react';

export default function useManifestValidation(manifest) {
  const result = useMemo(() => {
    if (!manifest) return { isValid: false, error: null };

    const required = ['name', 'symbol', 'description', 'imageURI'];
    for (let field of required) {
      if (!manifest[field]) return { isValid: false, error: `Missing field: ${field}` };
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (!urlRegex.test(manifest.imageURI)) {
      return { isValid: false, error: 'Invalid image URI format (must be URL)' };
    }

    return { isValid: true, error: null };
  }, [manifest]);

  return result;
}
