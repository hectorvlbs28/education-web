import { render } from '@testing-library/react';

import Forgotpassword from './forgotpassword';

describe('Forgotpassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Forgotpassword />);
    expect(baseElement).toBeTruthy();
  });
});
