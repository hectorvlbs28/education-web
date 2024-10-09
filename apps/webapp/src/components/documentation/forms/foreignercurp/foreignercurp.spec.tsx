import { render } from '@testing-library/react';

import Foreignercurp from './foreignercurp';

describe('Foreignercurp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Foreignercurp />);
    expect(baseElement).toBeTruthy();
  });
});
