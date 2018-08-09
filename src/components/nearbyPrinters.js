import React, {Component} from 'react';
import {
} from 'react-native';
import {
  Spinner,
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Content,
  Icon,
  Title,
  Text,
} from 'native-base';
import MenuButton from './menuButton';

export default class NearbyPrinters extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <MenuButton navigation={this.props.navigation}/>
          </Left>
          <Body>
            <Title>Nearby Printers</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button onPress={() => {
            this.props.navigation.navigate('RequestPrint');
          }}>
            <Text>ABC</Text>
            <Text>ABC</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
