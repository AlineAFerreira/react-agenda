import React from 'react';
import { shallow } from 'enzyme';
import Home from './';

it('renders welcome message', () => {
  const wrapper = shallow(<Home />);
  const welcome = "Home";
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});