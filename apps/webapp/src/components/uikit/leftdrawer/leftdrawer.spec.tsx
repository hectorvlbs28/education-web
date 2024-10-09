import { render } from '@testing-library/react';

import Leftdrawer from './leftdrawer';

describe('Leftdrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Leftdrawer />);
    expect(baseElement).toBeTruthy();
  });
});
