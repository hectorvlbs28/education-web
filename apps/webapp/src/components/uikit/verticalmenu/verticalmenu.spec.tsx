import { render } from '@testing-library/react';

import Verticalmenu from './verticalmenu';

describe('Verticalmenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Verticalmenu />);
    expect(baseElement).toBeTruthy();
  });
});
