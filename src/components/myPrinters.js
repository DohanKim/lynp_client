import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  Body,
  Right,
  Content,
} from 'native-base';
import MenuButton from './menuButton';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <MenuButton {...this.props}/>
          </Left>
          <Body>
            <Title>My Printers</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}
