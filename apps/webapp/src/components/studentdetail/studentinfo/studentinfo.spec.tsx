import { render } from '@testing-library/react';

import Studentinfo from './studentinfo';

describe('Studentinfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentinfo />);
    expect(baseElement).toBeTruthy();
  });
});
