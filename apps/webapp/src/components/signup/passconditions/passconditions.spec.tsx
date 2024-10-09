import { render } from '@testing-library/react';

import Passconditions from './passconditions';

describe('Passconditions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Passconditions />);
    expect(baseElement).toBeTruthy();
  });
});
