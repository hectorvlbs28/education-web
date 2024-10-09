import { render } from '@testing-library/react';

import Adminstudents from './adminstudents';

describe('Adminstudents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Adminstudents />);
    expect(baseElement).toBeTruthy();
  });
});
