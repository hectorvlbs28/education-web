import { render } from '@testing-library/react';

import Studentinforow from './studentinforow';

describe('Studentinforow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentinforow />);
    expect(baseElement).toBeTruthy();
  });
});
