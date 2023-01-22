import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateThreadForm from './CreateThreadForm';
import store from '../states/index';

import '@testing-library/jest-dom';

function Wrapper({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('CreateThreadForm component', () => {
  it('should not render the form if user not authed', () => {
    render(
      <Wrapper>
        <CreateThreadForm />
      </Wrapper>,
    );

    const form = screen.queryByTestId('create-thread-form');

    expect(form).toBeNull();
  });

  it('should render the form if user is authed', () => {
    store.dispatch({
      type: 'authUser/set',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    });
    render(
      <Wrapper>
        <CreateThreadForm />
      </Wrapper>,
    );

    const form = screen.queryByTestId('create-thread-form');

    expect(form).toBeInTheDocument();
  });

  it('should not render the form if user not authed 2', () => {
    render(
      <Wrapper>
        <CreateThreadForm />
      </Wrapper>,
    );

    const form = screen.queryByTestId('create-thread-form');

    expect(form).toBeNull();
  });
});
