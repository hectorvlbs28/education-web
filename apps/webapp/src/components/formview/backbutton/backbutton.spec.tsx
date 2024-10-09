import { render } from '@testing-library/react';

import Backbutton from './backbutton';

describe('Backbutton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Backbutton />);
    expect(baseElement).toBeTruthy();
  });
});
