const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  const getAccessToken = () => {
    localStorage.getItem('accessToken');
  };

  const putAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  };

  const fetchWithToken = (url, options = {}) => (
    fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
  );

  const register = async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    return { status };
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;
    return { token };
  };

  const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;
    return { users };
  };

  const getMe = async () => {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return { user };
  };

  const createThread = async ({ title, body, category }) => {
    const response = await fetchWithToken(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;
    return { thread };
  };

  const getAllThreads = async () => {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;
    return { threads };
  };

  const getDetailThread = async (threadId) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;
    return { detailThread };
  };

  const createComment = async (threadId, content) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;
    return { comment };
  };

  const upVoteThread = async (threadId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };

  const downVoteThread = async (threadId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };

  const neutralizeVoteThread = async (threadId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };

  const upVoteComment = async (threadId, commentId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };
  const downVoteComment = async (threadId, commentId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };
  const neutralizeVoteComment = async (threadId, commentId) => {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { vote } } = responseJson;
    return { vote };
  };

  const getLeaderboards = async () => {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { leaderboards } } = responseJson;
    return { leaderboards };
  };

  return {
    getAccessToken,
    putAccessToken,
    removeAccessToken,
    register,
    login,
    getAllUsers,
    getMe,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
