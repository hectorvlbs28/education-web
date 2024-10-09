import { render } from '@testing-library/react';

import Paymentmethods from './paymentmethods';

describe('Paymentmethods', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paymentmethods />);
    expect(baseElement).toBeTruthy();
  });
});
