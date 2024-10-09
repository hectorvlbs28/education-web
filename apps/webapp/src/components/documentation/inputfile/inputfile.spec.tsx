import { render } from '@testing-library/react';

import Inputfile from './inputfile';

describe('Inputfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inputfile />);
    expect(baseElement).toBeTruthy();
  });
});
