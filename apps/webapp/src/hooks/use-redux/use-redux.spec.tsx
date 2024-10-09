import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useRedux from './use-redux';

describe('useRedux', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useRedux());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
