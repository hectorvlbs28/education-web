import { render } from '@testing-library/react';

import Adminhome from './adminhome';

describe('Adminhome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Adminhome />);
    expect(baseElement).toBeTruthy();
  });
});
