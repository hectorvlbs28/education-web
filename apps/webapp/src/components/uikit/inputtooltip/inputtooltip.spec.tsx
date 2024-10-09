import { render } from '@testing-library/react';

import Inputtooltip from './inputtooltip';

describe('Inputtooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inputtooltip />);
    expect(baseElement).toBeTruthy();
  });
});
