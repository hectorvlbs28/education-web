import { render } from '@testing-library/react';

import Useravatar from './useravatar';

describe('Useravatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Useravatar />);
    expect(baseElement).toBeTruthy();
  });
});
