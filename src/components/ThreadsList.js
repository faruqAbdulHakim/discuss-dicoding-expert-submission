import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';
import ThreadFilter from './ThreadFilter';

function ThreadsList({ threads }) {
  const [filter, setFilter] = useState(null);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filterChangeHandler = (newFilter) => {
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  const filteredThreads = filter === null
    ? threads
    : threads.filter((thread) => thread.category === filter);

  return (
    <div className="space-y-4">
      <ThreadFilter filter={filter} filtersList={categories} onChange={filterChangeHandler} />
      {filteredThreads.map((thread) => (
        <ThreadItem
          key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          owner={thread.owner}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default ThreadsList;
