import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Card,
  CardItem,
  Item,
  Label,
  Input,
  Text,
  Button,
  Icon,
  View,
} from 'native-base';
import MenuButton from './menuButton';
import Global from '../global';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Toast from 'react-native-simple-toast';

export default class ChargeBalance extends Component {
  constructor(props){
    super(props);
    this.state = {
      balance : null,
      card: {},
      chargeCost: '0',
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("willreceive");
    this._getInfo();
  }

  componentWillMount() {
    this._getInfo();
  }

  _getInfo = () => {
    console.log("start get info");

    fetch(`${Global.host}/api/me`, {headers : Global.headers})
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);

        this.setState({balance: rjson.balance, card: rjson.card});
      });
  }

  _chargeBalance = () => {
    console.log("Charge Price : ", this.state.chargeCost);
    fetch(`${Global.host}/api/charge`, {
      method : 'POST',
      headers : Global.headers,
      body : JSON.stringify({
        price : parseInt(this.state.chargeCost),
      }),
    })
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);

        Toast.show(rjson.msg);
        this._getInfo();
      });
  }

  render() {
    console.log("CARD:", this.state.card);
    let isCardExist = this.state.card.number && this.state.card.number.length > 0;
    let cardNumber = null;
    if (isCardExist) {
      cardNumber = ( 
      <Text>
        <FontAwesomeIcon size = {10} name = 'circle'/>
        <FontAwesomeIcon size = {10} name = 'circle'/>
        <FontAwesomeIcon size = {10} name = 'circle'/>
        <FontAwesomeIcon size = {10} name = 'circle'/>
        <Text> { this.state.card['number'].substring(15, 19) } </Text>
      </Text>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <MenuButton {...this.props}/>
          </Left>
          <Body>
            <Title> Payment </Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem header bordered>
              <Text> Payment Method </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name='card'/>
                {cardNumber}
              </Left>
              <Right>
                <Button info onPress={() => this.props.navigation.navigate('NewCard', {card: this.state.card})}>
                  <Text>{isCardExist? 'Edit': 'Add'} </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Balance</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name = 'coins' type='MaterialCommunityIcons' />
                <Text>{this.state.balance}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Item inlineLabel>
                  <Label>Charge $</Label>
                  <Input onChangeText={(value) => this.setState({chargeCost: value})} value={this.state.chargeCost} />
                </Item>
              </Left>
              <Right>
                <Button info onPress={this._chargeBalance}>
                  <Text>Charge</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
  },
})
