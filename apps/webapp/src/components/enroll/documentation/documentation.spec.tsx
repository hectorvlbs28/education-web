import { render } from '@testing-library/react';

import Documentation from './documentation';

describe('Documentation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Documentation />);
    expect(baseElement).toBeTruthy();
  });
});
