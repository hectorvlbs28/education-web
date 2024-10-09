import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useMediaquery from './use-mediaquery';

describe('useMediaquery', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useMediaquery());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
