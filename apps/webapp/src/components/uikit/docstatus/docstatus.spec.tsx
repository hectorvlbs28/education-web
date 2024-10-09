import { render } from '@testing-library/react';

import Docstatus from './docstatus';

describe('Docstatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Docstatus />);
    expect(baseElement).toBeTruthy();
  });
});
