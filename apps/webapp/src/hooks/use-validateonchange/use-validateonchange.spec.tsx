import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useValidateonchange from './use-validateonchange';

describe('useValidateonchange', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useValidateonchange());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
