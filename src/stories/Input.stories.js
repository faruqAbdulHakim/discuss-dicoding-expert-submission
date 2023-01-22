/* eslint-disable react/jsx-props-no-spreading */
import Input from '../components/UI/Input';
import Wrapper from '../components/UI/Wrapper';

const stories = {
  title: 'Input',
  component: Input,
};

export default stories;

const TemplateStory = (args) => <Wrapper className="max-w-sm"><Input {...args} /></Wrapper>;

const Normal = TemplateStory.bind({});
Normal.args = {
  name: 'email',
  type: 'email',
  required: true,
  value: '',
  placeholder: 'Enter your email',
};

const WithLabel = TemplateStory.bind({});
WithLabel.args = {
  id: 'Email',
  label: 'Email',
  name: 'email',
  type: 'email',
  required: true,
  value: '',
  placeholder: 'Enter your email',
};

export { Normal, WithLabel };
