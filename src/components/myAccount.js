import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  Body,
  Right,
  Content,
  View,
  Icon,
  Button,
  Fab,
  List,
  ListItem,
  Thumbnail,
  Item,
  Text,
} from 'native-base';
import MenuButton from './menuButton';
import Global from '../global';

export default class MyAccount extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <MenuButton {...this.props}/>
          </Left>
          <Body>
            <Title>My Account</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button onPress={() => this.props.navigation.navigate('Auth')}>
            <Text>Sign out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

