import { render } from '@testing-library/react';

import Admingroups from './admingroups';

describe('Admingroups', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Admingroups />);
    expect(baseElement).toBeTruthy();
  });
});
