import { render } from '@testing-library/react';

import Navigate from './navigate';

describe('Navigate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navigate />);
    expect(baseElement).toBeTruthy();
  });
});
