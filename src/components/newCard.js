import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Text,
  Title,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import { CreditCardInput } from "react-native-credit-card-input";
import Global from '../global';
import Toast from 'react-native-simple-toast';

export default class NewCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      card : {},
    }
  }

  componentDidMount = () => {
    this._getCardInfo();
  }

  _getCardInfo = () => {
    const card = this.props.navigation.getParam('card');

    console.log(card);

    if(card.number.length > 0){
      this.CCInput.setValues({ number : card['number'], expiry : card['expire'], cvc : card['cvc'] });
      this.state.card = card;
    }
  }

  _onChange = (form) => {
    console.log(form);

    const card = {
      number : form.values.number,
      expire : form.values.expiry,
      cvc : form.values.cvc,
    }

    this.setState({card});

    console.log('state in on Change : ', this.state);

  }

  _registerCard = () => {
    console.log('state in registerCard function : ', this.state);

    fetch(`${Global.host}/api/card`, {
      method : 'PUT',
      headers : Global.headers,
      body : JSON.stringify({
        number : this.state.card.number,
        expire : this.state.card.expire,
        cvc : this.state.card.cvc,
      }),
    }).then((response) => {
      console.log(response);

      response.json().then((rjson) => {
        Toast.show(rjson.msg);

        if (rjson.success){
          this.props.navigation.navigate('ChargeBalance', {token: Date.now()});
        }
      })
    });
  }

  render() {
    const card = this.props.navigation.getParam('card');

    return (
      <Container>
        <Header>
          <Body>
            <Title> New Card </Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <CreditCardInput
            ref={(c) => this.CCInput = c}
            onChange={this._onChange}
            invalidColor='black'
          />
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button full onPress = { () => this._registerCard() }>
              <Text style={styles.footerText}>{card.number.length > 0 ? 'Update' : 'Register'}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  content: {
    marginTop: 40,
  },
  registerButton : {
    marginTop : 10,
  },
  footerText: {
    color: 'white',
    fontSize: 15,
  },
};
