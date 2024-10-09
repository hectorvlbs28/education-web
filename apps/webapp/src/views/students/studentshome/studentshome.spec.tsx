import { render } from '@testing-library/react';

import Aspiranteshome from './studentshome';

describe('Aspiranteshome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Aspiranteshome />);
    expect(baseElement).toBeTruthy();
  });
});
