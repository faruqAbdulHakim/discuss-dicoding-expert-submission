import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadFilter from './ThreadFilter';

import '@testing-library/jest-dom';

describe('ThreadFilter component', () => {
  it('should render all filtersList', async () => {
    render(<ThreadFilter
      filter={null}
      filtersList={['filter-1', 'filter-2']}
      onChange={() => {}}
    />);

    const filter1 = screen.queryByRole('button', { name: '#filter-1' });
    const filter2 = screen.queryByRole('button', { name: '#filter-2' });

    expect(filter1).toBeInTheDocument();
    expect(filter2).toBeInTheDocument();
  });

  it('should call onChange function when one of the filter clicked', async () => {
    const mockOnChange = jest.fn();
    render(<ThreadFilter
      filter={null}
      filtersList={['filter-1', 'filter-2']}
      onChange={mockOnChange}
    />);
    const filter1 = screen.getByRole('button', { name: '#filter-1' });
    const filter2 = screen.getByRole('button', { name: '#filter-2' });

    await userEvent.click(filter1);
    await userEvent.click(filter2);

    expect(mockOnChange).toBeCalledTimes(2);
    expect(mockOnChange).toBeCalledWith('filter-1');
    expect(mockOnChange).toBeCalledWith('filter-2');
  });
});
