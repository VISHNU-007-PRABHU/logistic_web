import { render } from '@testing-library/react';

import ReactMonorepoLibs from './libs';

describe('ReactMonorepoLibs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactMonorepoLibs />);
    expect(baseElement).toBeTruthy();
  });
});
