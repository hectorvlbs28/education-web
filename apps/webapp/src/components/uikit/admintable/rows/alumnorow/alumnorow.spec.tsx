import { render } from '@testing-library/react';

import Alumnorow from './alumnorow';

describe('Alumnorow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Alumnorow />);
    expect(baseElement).toBeTruthy();
  });
});
