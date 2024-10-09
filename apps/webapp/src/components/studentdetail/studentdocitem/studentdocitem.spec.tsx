import { render } from '@testing-library/react';

import Studentdocitem from './studentdocitem';

describe('Studentdocitem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentdocitem />);
    expect(baseElement).toBeTruthy();
  });
});
