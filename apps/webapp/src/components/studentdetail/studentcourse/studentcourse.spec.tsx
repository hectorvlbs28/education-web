import { render } from '@testing-library/react';

import Studentcourse from './studentcourse';

describe('Studentcourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentcourse />);
    expect(baseElement).toBeTruthy();
  });
});
