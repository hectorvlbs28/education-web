import { render } from '@testing-library/react';

import Formview from './formview';

describe('Formview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Formview />);
    expect(baseElement).toBeTruthy();
  });
});
