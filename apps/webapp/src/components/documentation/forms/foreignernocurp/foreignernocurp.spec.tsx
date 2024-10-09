import { render } from '@testing-library/react';

import Foreignernocurp from './foreignernocurp';

describe('Foreignernocurp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Foreignernocurp />);
    expect(baseElement).toBeTruthy();
  });
});
