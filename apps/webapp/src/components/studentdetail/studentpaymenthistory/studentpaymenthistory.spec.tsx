import { render } from '@testing-library/react';

import Studentpaymenthistory from './studentpaymenthistory';

describe('Studentpaymenthistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentpaymenthistory />);
    expect(baseElement).toBeTruthy();
  });
});
