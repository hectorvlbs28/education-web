import { render } from '@testing-library/react';

import Studentdetail from './studentdetail';

describe('Studentdetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentdetail />);
    expect(baseElement).toBeTruthy();
  });
});
