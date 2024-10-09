import { render } from '@testing-library/react';

import Enroll from './enroll';

describe('Enroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Enroll />);
    expect(baseElement).toBeTruthy();
  });
});
