import { render } from '@testing-library/react';

import Signcontract from './signcontract';

describe('Signcontract', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Signcontract />);
    expect(baseElement).toBeTruthy();
  });
});
