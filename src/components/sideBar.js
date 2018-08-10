import React, {Component} from 'react';
import { 
  Image,
  Platform,
} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
} from 'native-base';
import logo from '../../assets/logo.png';

const data = [
  {
    name: 'Request Print',
    route: 'Print',
    icon: 'document',
  },
  {
    name: 'My Printers',
    route: 'Printer',
    icon: 'print',
  },
  {
    name: 'Payment',
    route: 'Payment',
    icon: 'card',
  },
  {
    name: 'History',
    route: 'History',
    icon: 'archive',
  },
  {
    name: 'Setting',
    route: 'Setting',
    icon: 'settings',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderRow = (row) => {
      return (
        <ListItem button noBorder onPress={() => {
          this.props.navigation.toggleDrawer();
          this.props.navigation.navigate(row.route);
        }}>
          <Icon active name={row.icon} style={styles.icon}/>
          <Text style={styles.text}>
            {row.name}
          </Text>
        </ListItem>
      );
    };

    return (
      <Container>
        <Content bounces={false} style={styles.content}>
          <Image source={logo} style={styles.logo}/> 
          <List dataArray={data} renderRow={renderRow}/>
        </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: 220,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: { 
    color: '#777', 
    fontSize: 30, 
    width: 30,
    marginLeft: 20,
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 16,
    marginLeft: 20,
  },
};

export default SideBar;
