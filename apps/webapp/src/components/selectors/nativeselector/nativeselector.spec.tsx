import { render } from '@testing-library/react';

import Nativeselector from './nativeselector';

describe('Nativeselector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Nativeselector />);
    expect(baseElement).toBeTruthy();
  });
});
