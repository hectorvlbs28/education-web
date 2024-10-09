import { render } from '@testing-library/react';

import Studentsacademicoffer from './studentsacademicoffer';

describe('Studentsacademicoffer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Studentsacademicoffer />);
    expect(baseElement).toBeTruthy();
  });
});
