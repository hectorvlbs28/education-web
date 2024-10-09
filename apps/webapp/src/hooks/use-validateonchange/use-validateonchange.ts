import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseValidateonchange {
  validateOnChange: boolean;
  toggleValidateOnChange: () => void;
}

export function useValidateonchange(): UseValidateonchange {
  const [validateOnChange, setValidateOnChange] = useState(false);

  const toggleValidateOnChange = useCallback(() => {
    setValidateOnChange((prev) => !prev);
  }, []);

  return { validateOnChange, toggleValidateOnChange };
}

export default useValidateonchange;
