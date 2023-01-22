import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

import '@testing-library/jest-dom';

describe('RegisterForm component', () => {
  it('should handle name typing correctly', async () => {
    render(<RegisterForm onRegister={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Masukkan nama');

    await userEvent.type(nameInput, 'fake-name');

    expect(nameInput).toHaveValue('fake-name');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterForm onRegister={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Masukkan email');

    await userEvent.type(emailInput, 'fake-email@mail.com');

    expect(emailInput).toHaveValue('fake-email@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterForm onRegister={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Masukkan password');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should handle password confirmation typing correctly', async () => {
    render(<RegisterForm onRegister={() => {}} />);
    const passwordConfirmationInput = screen.getByPlaceholderText('Masukkan ulang password');

    await userEvent.type(passwordConfirmationInput, 'password123');

    expect(passwordConfirmationInput).toHaveValue('password123');
  });

  it('should call onRegister function when form submitted', async () => {
    const mockOnRegister = jest.fn();
    render(<RegisterForm onRegister={mockOnRegister} />);
    const nameInput = screen.getByPlaceholderText('Masukkan nama');
    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const passwordConfirmationInput = screen.getByPlaceholderText('Masukkan ulang password');
    const formSubmitButton = screen.getByRole('button', { name: 'Daftar' });
    await userEvent.type(nameInput, 'fake-name');
    await userEvent.type(emailInput, 'fake-email@mail.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(passwordConfirmationInput, 'password123');

    await userEvent.click(formSubmitButton);

    expect(mockOnRegister).toBeCalledWith({
      name: 'fake-name',
      email: 'fake-email@mail.com',
      password: 'password123',
    });
  });
});
