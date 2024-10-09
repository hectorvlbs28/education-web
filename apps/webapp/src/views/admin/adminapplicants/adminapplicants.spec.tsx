import { render } from '@testing-library/react';

import Adminapplicants from './adminapplicants';

describe('Adminapplicants', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Adminapplicants />);
    expect(baseElement).toBeTruthy();
  });
});
