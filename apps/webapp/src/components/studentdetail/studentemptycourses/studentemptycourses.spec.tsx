import { render } from '@testing-library/react';

import Studentemptycourses from './studentemptycourses';

describe('Studentemptycourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentemptycourses />);
    expect(baseElement).toBeTruthy();
  });
});
