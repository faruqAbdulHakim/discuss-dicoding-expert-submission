import { render } from '@testing-library/react';
import Card from './Card';

import '@testing-library/jest-dom';

describe('Card component', () => {
  it('should render children', () => {
    const MockChildren = jest.fn(() => <div>this is children</div>);
    render(<Card><MockChildren /></Card>);

    expect(MockChildren).toBeCalledTimes(1);
  });
});
