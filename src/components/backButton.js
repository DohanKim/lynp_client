import React, {Component} from 'react';
import {
  Button,
  Icon,
} from 'native-base';

export default class BackButton extends Component {
  render() {
    return ( 
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name="arrow-back"/>
      </Button>
    );
  }
}
