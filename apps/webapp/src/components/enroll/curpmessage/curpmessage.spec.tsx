import { render } from '@testing-library/react';

import Curpmessage from './curpmessage';

describe('Curpmessage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Curpmessage />);
    expect(baseElement).toBeTruthy();
  });
});
