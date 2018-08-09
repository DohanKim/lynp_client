import React, {Component} from 'react';
import {Root} from 'native-base';
import Navigator from './src/navigator';

export default class App extends Component {
  render() {
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
}
