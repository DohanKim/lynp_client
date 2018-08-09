import React, {Component} from 'react';
import {
  View,
  Spinner,
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Icon,
  Title,
} from 'native-base';
import MenuButton from './menuButton';
import MapView, { Marker, Callout } from 'react-native-maps';
import Global from '../global';

export default class NearbyPrinters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: null,
      printers: null,
      isMapReady: false,
    }
  }

  componentWillMount = () => {
    this._getPrinters();
    this._getCurrentLocation();
  }

  _getCurrentLocation = () => {
    console.log('get Current Location');
    navigator.geolocation.getCurrentPosition((position) => {
      const currentRegion = {
        longitude : position.coords.longitude,
        latitude : position.coords.latitude,
        latitudeDelta : 0.02,
        longitudeDelta : 0.02,
      };

      this.setState({currentRegion: currentRegion});
    });
  }

  _getPrinters = () => {
    console.log("get Printers");
    fetch(`${Global.host}/api/printers`, {headers : Global.headers})
      .then((res) => res.json())
      .then((rjson) => {
        this.setState({printers: rjson});
      })
      .catch((err) => console.log(err));
  }

  _onMapReady = () => {
    console.log("MAPREADY");
    this.setState({isMapReady: true});
  }

  render() {
    let content;
    if (this.state.currentRegion && this.state.printers) {
      let renderPrinter = (printer) => {
        return (
          // TODO: change marker icon
          // Showing Route?
          <Marker key={printer._id}
            coordinate={{latitude: printer.location[0], longitude: printer.location[1]}}
            title={printer.name}
            onPress={() => {
              // TODO: show printer detail popup
              this.props.navigation.navigate('RequestPrint', {printer: printer});
            }}
          />);
      };

      content = (
        <MapView initialRegion={this.state.currentRegion} style={styles.map}>
          {this.state.printers.map(renderPrinter)}
        </MapView>);
    } else {
      content = <Spinner />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <MenuButton {...this.props}/>
          </Left>
          <Body>
            <Title>Nearby Printers</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          {content}
        </View>
      </Container>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};
