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
  Switch,
  Text,
} from 'native-base';
import update from 'immutability-helper';
import MenuButton from './menuButton';
import Global from '../global';
import Toast from 'react-native-simple-toast';

export default class MyPrinters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			printers : [],
		}
	}

  componentWillReceiveProps(nextProps) {
    // let token = nextProps.navigation.getParam('token', {});
    console.log("willreceive");
    this._getPrinters();
  }

  componentWillMount() {
    console.log("willmount");
    this._getPrinters();
  }

  _getPrinters = () => {
    fetch(`${Global.host}/api/my_printers`, {headers : Global.headers})
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({printers: rjson});
      });
  }

  _togglePrinterStatus = (printer, i) => {
    let isOn = this.state.printers[i].isOn;
    this.setState({printers: update(this.state.printers, {[i]: {isOn: {$set: !isOn}}})})

    fetch(`${Global.host}/api/printers/${printer._id}/toggleOnOff`, {
      method: 'POST',
      headers : Global.headers,
    })
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        if (!rjson.success) {
          Toast.show(rjson.msg); 
          this._getPrinters();
        }
      });
  }

  render() {
    let listItems = (
      <ListItem>
        <Body>
          <Text>No Printer Yet</Text>
        </Body>
      </ListItem>
    );
    if (this.state.printers.length > 0) {
      listItems = this.state.printers.map((printer, i) => {
        return (
          <ListItem key={i}>
            <Body>
              <Text>{printer.name}</Text>
              <Text note>Model: {printer.model}</Text>
              <Text note>Address: {printer.address}</Text>
            </Body>
            <Right>
              <Switch value={printer.isOn} onValueChange={() => this._togglePrinterStatus(printer, i)} />
            </Right>
          </ListItem>
        );
      });
    }

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
        <View style={styles.full}>
          <Content style={styles.full}>
            <List>
              <ListItem itemHeader first>
                <Text>You can turn ON/OFF the Printer Sharing</Text>
              </ListItem>
              {listItems}
            </List>
          </Content>
          <Fab
            style={styles.fab}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('FindLocation')}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = {
  full: {
    flex: 1,
  },
  fab: {
    backgroundColor: '#5067FF',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
};
