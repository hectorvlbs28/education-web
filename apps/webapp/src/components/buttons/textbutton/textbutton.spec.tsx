import { render } from '@testing-library/react';

import Textbutton from './textbutton';

describe('Textbutton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Textbutton />);
    expect(baseElement).toBeTruthy();
  });
});
