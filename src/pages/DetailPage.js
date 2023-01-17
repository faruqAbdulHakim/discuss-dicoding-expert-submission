import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Wrapper from '../components/UI/Wrapper';
import AppBar from '../components/AppBar';
import ThreadDetail from '../components/ThreadDetail';
import ThreadCommentsList from '../components/ThreadCommentsList';
import CreateCommentForm from '../components/CreateCommentForm';
import { asyncReceiveDetailThread } from '../states/detailThread/action';

function DetailPage() {
  const { detailThread = null } = useSelector((states) => states);
  const { threadId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, []);

  return (
    <Wrapper>
      <AppBar />
      <Link to="/" className="flex gap-2 items-center mb-2">
        <AiOutlineArrowLeft />
        Home
      </Link>
      {detailThread && (
        <>
          <ThreadDetail
            title={detailThread.title}
            body={detailThread.body}
            category={detailThread.category}
            createdAt={detailThread.createdAt}
            owner={detailThread.owner}
            upVotesBy={detailThread.upVotesBy}
            downVotesBy={detailThread.downVotesBy}
          />
          <CreateCommentForm />
          <ThreadCommentsList comments={detailThread.comments} />
        </>
      )}
    </Wrapper>
  );
}

export default DetailPage;
