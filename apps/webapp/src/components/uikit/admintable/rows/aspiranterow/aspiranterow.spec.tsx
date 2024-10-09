import { render } from '@testing-library/react';

import Aspiranterow from './aspiranterow';

describe('Aspiranterow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Aspiranterow />);
    expect(baseElement).toBeTruthy();
  });
});
