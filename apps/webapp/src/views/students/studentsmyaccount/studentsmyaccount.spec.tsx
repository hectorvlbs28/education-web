import { render } from '@testing-library/react';

import Aspirantesmyaccount from './studentsmyaccount';

describe('Aspirantesmyaccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Aspirantesmyaccount />);
    expect(baseElement).toBeTruthy();
  });
});
