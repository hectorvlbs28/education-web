import { render } from '@testing-library/react';

import Uploadingdocuments from './uploadingdocuments';

describe('Uploadingdocuments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Uploadingdocuments />);
    expect(baseElement).toBeTruthy();
  });
});
