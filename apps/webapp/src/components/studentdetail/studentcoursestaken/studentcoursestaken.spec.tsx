import { render } from '@testing-library/react';

import Studentcoursestaken from './studentcoursestaken';

describe('Studentcoursestaken', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentcoursestaken />);
    expect(baseElement).toBeTruthy();
  });
});
