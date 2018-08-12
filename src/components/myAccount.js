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
  Card,
  CardItem,
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
            <Title>Setting</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem header>
              <Text>{Global.username}</Text>
            </CardItem>
          </Card>
          <Button style={styles.signOut} full onPress={() => this.props.navigation.navigate('Auth')}>
            <Text>Sign out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    padding: 10,
  },
  signOut: {
    marginTop: 60,
  },
};
