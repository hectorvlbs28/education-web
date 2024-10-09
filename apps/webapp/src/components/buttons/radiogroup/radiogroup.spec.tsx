import { render } from '@testing-library/react';

import Radiogroup from './radiogroup';

describe('Radiogroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Radiogroup />);
    expect(baseElement).toBeTruthy();
  });
});
