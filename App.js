import React, {Component} from 'react';
import {Root} from 'native-base';
import Navigator from './src/navigator';

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
}
