import React, {Component} from 'react';
import {
  Button,
  Icon,
} from 'native-base';

export default class MenuButton extends Component {
  render() {
    return (
      <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
        <Icon name="menu"/>
      </Button>
    );
  }
};
