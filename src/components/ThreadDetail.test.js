import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ThreadDetail from './ThreadDetail';
import store from '../states/index';

import '@testing-library/jest-dom';
import { formatDate } from '../utils';

function ReduxWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

ReduxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('ThreadDetail component', () => {
  it('should render correctly', () => {
    render(
      <ReduxWrapper>
        <ThreadDetail
          title="fake-title"
          body="fake-body"
          category="fake-category"
          createdAt="2021-06-21T07:00:00.000Z"
          upVotesBy={['fake-userId']}
          downVotesBy={[]}
          owner={{
            id: 'fake-userId',
            name: 'fake-name',
            avatar: 'fake-avatar',
          }}
        />
      </ReduxWrapper>,
    );

    const category = screen.queryByText('#fake-category');
    const title = screen.queryByText('fake-title');
    const body = screen.queryByText('fake-body');
    const date = screen.queryByText(formatDate('2021-06-21T07:00:00.000Z'));
    const avatarImg = screen.queryByAltText('avatar');
    const voteButtons = screen.queryAllByRole('button');

    expect(category).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg.getAttribute('src')).toBe('fake-avatar');
    expect(voteButtons.length).toBe(2);
    expect(voteButtons[0]).toBeInTheDocument();
    expect(voteButtons[1]).toBeInTheDocument();
  });
});
