import { render } from '@testing-library/react';

import Userpopper from './userpopper';

describe('Userpopper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Userpopper />);
    expect(baseElement).toBeTruthy();
  });
});
