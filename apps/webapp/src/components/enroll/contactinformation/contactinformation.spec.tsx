import { render } from '@testing-library/react';

import Contactinformation from './contactinformation';

describe('Contactinformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Contactinformation />);
    expect(baseElement).toBeTruthy();
  });
});
