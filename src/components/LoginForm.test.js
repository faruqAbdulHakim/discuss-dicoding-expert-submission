import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

import '@testing-library/jest-dom';

describe('LoginForm component', () => {
  it('should handle email typing correctly', async () => {
    render(<LoginForm onLogin={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Masukkan email');

    await userEvent.type(emailInput, 'fake-email@mail.com');

    expect(emailInput).toHaveValue('fake-email@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginForm onLogin={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Masukkan password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call onLogin function when form submitted', async () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);
    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const formSubmitButton = screen.getByRole('button', { name: 'Masuk' });
    await userEvent.type(emailInput, 'fake-email@mail.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(formSubmitButton);

    expect(mockOnLogin).toBeCalledWith({
      email: 'fake-email@mail.com',
      password: 'password123',
    });
  });
});
