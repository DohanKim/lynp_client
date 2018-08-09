import React, {Component} from 'react';
import {
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Content,
  Icon,
  Title,
} from 'native-base';
import MenuButton from './menuButton';

export default class RequestPrint extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title>Request Print</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}
