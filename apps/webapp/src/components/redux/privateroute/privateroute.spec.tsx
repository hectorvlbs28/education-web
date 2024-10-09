import { render } from '@testing-library/react';

import Privateroute from './privateroute';

describe('Privateroute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Privateroute />);
    expect(baseElement).toBeTruthy();
  });
});
