import { render } from '@testing-library/react';

import Typographies from './typographies';

describe('Typographies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Typographies />);
    expect(baseElement).toBeTruthy();
  });
});
