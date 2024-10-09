import { render } from '@testing-library/react';

import Mexican from './mexican';

describe('Mexican', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mexican />);
    expect(baseElement).toBeTruthy();
  });
});
