import { render } from '@testing-library/react';

import Paymenthistoryrow from './paymenthistoryrow';

describe('Paymenthistoryrow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paymenthistoryrow />);
    expect(baseElement).toBeTruthy();
  });
});
