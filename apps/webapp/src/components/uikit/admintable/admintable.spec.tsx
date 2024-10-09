import { render } from '@testing-library/react';

import Admintable from './admintable';

describe('Admintable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Admintable />);
    expect(baseElement).toBeTruthy();
  });
});
