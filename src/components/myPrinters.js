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

export default class MyPrinters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			printers : null,
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

  render() {
    let listItems = <Text>No Printer Yet</Text>;
    if (this.state.printers) {
      listItems = this.state.printers.map((printer, i) => {
        return (
          <ListItem key={i}>
            <Body>
              <Text>{printer.name}</Text>
              <Text note>{printer.model}</Text>
              <Text note>{printer.address}</Text>
            </Body>
            <Right>
              <Icon active name='coins' type='MaterialCommunityIcons' />
              <Text note>{printer.cost}</Text>
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
