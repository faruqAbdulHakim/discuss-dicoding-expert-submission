/* eslint-disable react/jsx-props-no-spreading */
import Card from '../components/UI/Card';
import Wrapper from '../components/UI/Wrapper';

const stories = {
  title: 'Card',
  component: Card,
};

export default stories;

const TemplateStory = (args) => <Wrapper className="max-w-sm"><Card {...args} /></Wrapper>;

const Common = TemplateStory.bind({});
Common.args = {
  className: 'bg-white p-4',
  children: <h1>Example Card</h1>,
};

export { Common };
