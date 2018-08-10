import React, { Component } from 'react';
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
  Left,
  Right,
  Body,
  Title,
} from 'native-base';
import BackButton from './backButton';
import Global from '../global';
import Toast from 'react-native-simple-toast';

export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      checked_password : '',
      isvaild : false,
      isentered : false,
    };
  }

  _sendsignuprequest = () => {

    if (this.state.isvalid){

      fetch(`${Global.host}/api/sign_up`, {

        method : 'POST',
        headers : Global.headers,

        body : JSON.stringify({
          username : this.state.username,
          password : this.state.password,
        }),

      }).then((response) => {
        console.log(response);

        response.json().then((rjson) => {
          if (rjson.success){
            Toast.show("Signed Up Successfully");   
            this.props.navigation.navigate('SignIn');
          }

          else{
            Toast.show(rjson.msg);
          }
        })


      });
    }
  }

  _checkequalpassword = (password) => {
    this.setState({ isentered : true, checked_password : password });

    if (this.state.password == password){
      this.setState({ isvalid : true});   
    } else {
      this.setState({ isvalid : false});
    }

  }

  _showcheckresult = () => {

    if (this.state.isvalid){
      return(
        <Icon name = 'checkmark-circle' />
      );
    }

    else{
      return(
        <Icon name = 'close-circle' />
      );

    }
  }

  render(){
    return(
      <Container style={styles.container}>
        <Header>
          <Left>
            <BackButton {...this.props} />
          </Left>
          <Body>
            <Title> Sign Up </Title>
          </Body>
        </Header>
        <Content padder>
          <Form style = {{ marginBottom : 40 }}>
            <Item>
              <Input placeholder = "Username" onChangeText = { (text) => this.setState({ username : text}) }/>
            </Item>
            <Item>
              <Input placeholder = "Password" secureTextEntry={ true } onChangeText = { (text) => this.setState({ password : text}) }/>
            </Item>
            <Item success = {this.state.isvalid && this.state.isentered} error = {!this.state.isvalid && this.state.isentered}>
              <Input placeholder = "Password conformation" value = { this.state.checked_password } secureTextEntry={ true } onChangeText = { (text) => this._checkequalpassword(text) }/>
              {this.state.isentered ? this._showcheckresult() : <View/> }
            </Item>

          </Form>
          <Button primary block onPress = { () => this._sendsignuprequest() }>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container : {
    flex : 1,
    justifyContent : 'center',
    paddingTop: 20,
  },
  login_fail : {
    color : 'red',
    fontSize : 10,
  },
  logo: {
    width: 220,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 50,
    marginRight: 10,
  },
};
