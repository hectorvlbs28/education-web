import { render } from '@testing-library/react';

import Adminpayments from './adminpayments';

describe('Adminpayments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Adminpayments />);
    expect(baseElement).toBeTruthy();
  });
});
