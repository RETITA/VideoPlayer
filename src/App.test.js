import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { expect } from 'chai'
import { shallow } from 'enzyme'
import PlayerControl from './PlayerControl';
import sinon from 'sinon'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })

  it('contains PlayerControl', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.contain(<PlayerControl/>)
  })

  it('has 1 PLayerControl', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('PlayerControl')).to.have.length(1)
  })

})


