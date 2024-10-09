import { render } from '@testing-library/react';

import Searcher from './searcher';

describe('Searcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Searcher />);
    expect(baseElement).toBeTruthy();
  });
});
