import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Title,
  Content,
  Icon,
  Form,
  Text,
  Item,
  Label,
  Picker,
  Input,
  Footer,
  FooterTab,
} from 'native-base';
import BackButton from './backButton';
import Toast from 'react-native-simple-toast';
import Global from '../global';

export default class NewPrinter extends Component {
  constructor(props) {
    super(props);

    let region = props.navigation.getParam('region', {});
    console.log(region);
    this.state = {
      isColorSupported: false,
      lat: region.latitude,
      lng: region.longitude,
      address: props.navigation.getParam('address', ''),
    };
  }

  _addPrinter = () => {
    console.log(this.state);

    fetch(`${Global.host}/api/printer`, {
      method : 'POST',
      headers : Global.headers,
      body : JSON.stringify({
        printer_id : this.state.printer_id,
        model : this.state.model,
        name : this.state.name,
        lat : this.state.lat,
        lng : this.state.lng,
        address : this.state.address,
        isColorSupported : this.state.isColorSupported,
      }),
    })
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        Toast.show(rjson.msg);
        if (rjson.success){
          this.props.navigation.navigate('MyPrinters', {token: Date.now()});
        }
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <BackButton {...this.props}/>
          </Left>
          <Body>
            <Title>Add New Printer</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item inlineLabel style={styles.inputItem}>
              <Label>Printer ID</Label>
              <Input onChangeText={(value) => this.setState({printer_id: value})} value={this.state.printer_id} />
            </Item>
            <Item inlineLabel style={styles.inputItem}>
              <Label>Name</Label>
              <Input onChangeText={(value) => this.setState({name: value})} value={this.state.name} />
            </Item>
            <Item inlineLabel style={styles.inputItem}>
              <Label>Model</Label>
              <Input onChangeText={(value) => this.setState({model: value})} value={this.state.model} />
            </Item>
            <Item inlineLabel style={styles.inputItem}>
              <Label>Address</Label>
              <Input onChangeText={(value) => this.setState({address: value})} value={this.state.address} />
            </Item>
            <Item picker last style={styles.inputItem}>
              <Label>Color Support</Label>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                placeholder='Color'
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor='#007aff'
                selectedValue={this.state.isColorSupported}
                onValueChange={(value) => this.setState({isColorSupported: value})}
            >
              <Picker.Item label='Available' value={true} />
              <Picker.Item label='Unavailable' value={false} />
            </Picker>
          </Item>
          </Form>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button full onPress={this._addPrinter}>
              <Icon active name='add' />
              <Text style={styles.footerText}>Add</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  inputItem: {
    marginBottom: 5,
  },
  footer: {
  },
  footerTab: {
  },
  footerText: {
    color: 'white',
    fontSize: 15,
  },
};
