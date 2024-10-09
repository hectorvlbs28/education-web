import { render } from '@testing-library/react';

import Datecalendar from './datecalendar';

describe('Datecalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Datecalendar />);
    expect(baseElement).toBeTruthy();
  });
});
