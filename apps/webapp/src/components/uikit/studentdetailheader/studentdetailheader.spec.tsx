import { render } from '@testing-library/react';

import Studentdetailheader from './studentdetailheader';

describe('Studentdetailheader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentdetailheader />);
    expect(baseElement).toBeTruthy();
  });
});
