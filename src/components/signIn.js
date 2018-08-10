import React, { Component } from 'react';
import {
  Image,
} from 'react-native';
import {
  View,
  Content,
  Container,
  Header,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Card,
  CardItem,
} from 'native-base';
import Global from '../global';
import logo from '../../assets/logo.png';

export default class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
    }
  }

  _sendsigninrequest = () => {
    fetch(`${Global.host}/api/sign_in`, {
      method : 'POST',
      headers : Global.headers,
      body : JSON.stringify({
        username : this.state.username,
        password : this.state.password,
      }),
    }).then((response) => {
      console.log(response);

      if (response) {
        response.json().then((rjson) => {

          if (rjson.success){
            console.log('login success');
            Global.headers['Authorization'] = rjson.token;
            Global.username = this.state.username;

            this.props.navigation.navigate('App');
          }

          else{
            console.log('login not success');
            Alert.alert("Failed", rjson.msg);
          }

        });
      } else {
        console.log('response does not arrive');
      }
    });
  }

  render() {
    return(
      <Container>
        <Header transparent/>
        <Content padder>
          <Image source={logo} style={styles.logo}/> 
          <Form style = {{marginBottom : 40}}>
            <Item>
              <Input placeholder='Username' onChangeText = {(text) => this.setState({username : text})}/>
            </Item>
            <Item>
              <Input placeholder='Password' secureTextEntry={ true } onChangeText={(text) => this.setState({password : text})}/>
            </Item>
          </Form>
          <Button primary block onPress = { () => this._sendsigninrequest() }>
            <Text>Sign In</Text>
          </Button>
          <Button info block style = { styles.button } onPress = {() => this.props.navigation.navigate('SignUp')}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  logo: {
    width: 220,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 10,
  },
  button : {
    marginTop : 10,
  },
};
