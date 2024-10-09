import { render } from '@testing-library/react';

import Studentdocumentation from './studentdocumentation';

describe('Studentdocumentation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentdocumentation />);
    expect(baseElement).toBeTruthy();
  });
});
