import { render } from '@testing-library/react';

import Textinput from './textinput';

describe('Textinput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Textinput />);
    expect(baseElement).toBeTruthy();
  });
});
