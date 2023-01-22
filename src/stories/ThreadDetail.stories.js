/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import Wrapper from '../components/UI/Wrapper';
import store from '../states/index';

const stories = {
  title: 'ThreadDetail',
  component: ThreadDetail,
};

export default stories;

const TemplateStory = (args) => (
  <Provider store={store}>
    <Wrapper><ThreadDetail {...args} /></Wrapper>
  </Provider>
);

const Normal = TemplateStory.bind();
Normal.args = {
  title: 'Pengalaman Belajar React di Dicoding',
  body: 'Menurut teman-teman, bagaimana pengalaman belajar kelas React di Dicoding? Apakah mudah ataukah sulit? Yuk, ceritakan di sini.',
  category: 'react',
  createdAt: '2022-11-13T09:59:31.019Z',
  upVotesBy: ['user-5PqX6Ldhnk_ifroq', 'user-6oWew2w2Wx5xLUTU'],
  downVotesBy: [],
  owner: {
    id: 'user-5PqX6Ldhnk_ifroq',
    name: 'Dimas Saputra',
    avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
  },
};

export { Normal };
