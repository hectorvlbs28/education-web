import { render } from '@testing-library/react';

import Paswordinput from './paswordinput';

describe('Paswordinput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paswordinput label="Contraseña" />);
    expect(baseElement).toBeTruthy();
  });
});
