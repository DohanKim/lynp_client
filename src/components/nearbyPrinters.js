import React, {Component} from 'react';
import {
  View,
  Spinner,
  Item,
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Icon,
  Title,
  Text,
  Grid,
  Col,
  Row,
  Card,
  CardItem,
} from 'native-base';
import MenuButton from './menuButton';
import MapView, {Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Global from '../global';
import MarkerImage from '../../assets/marker_image.png';
import Secret from '../secret';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class NearbyPrinters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: null,
      printers: null,
      selectedMarker: null,
      duration: 0,
    }

    this._markers = [];
  }

  componentWillMount() {
    this._getPrinters();
    this.intervalId = setInterval(this._getPrinters, 3000);
     this._getCurrentLocation();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  _getCurrentLocation = () => {
    console.log('get Current Location');
    navigator.geolocation.getCurrentPosition((position) => {
      const currentRegion = {
        longitude : position.coords.longitude, 
        latitude : position.coords.latitude,
        latitudeDelta : 0.005,
        longitudeDelta : 0.005,
      };

      console.log("location:", currentRegion);
      this.setState({currentRegion: currentRegion});
    });
  }

  _getPrinters = () => {
    console.log("get Printers");
    fetch(`${Global.host}/api/printers`, {headers : Global.headers})
      .then((res) => res.json())
      .then((rjson) => {
        console.log("printer:", rjson);
        this.setState({printers: rjson});
      })
      .catch((err) => console.log(err));
  }

  _onDirectionReady = (result) => {
    this.setState({duration: Math.ceil(result.duration)});
    setTimeout(() => this._markers[this.state.selectedMarker].showCallout(), 0);
  }

  _truncateString = (str, length) => {
    const ending = '...';

    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };


  render() {
    let content;
    if (this.state.currentRegion && this.state.printers) {
      let renderPrinter = (printer, i) => {
        if (!printer.isOn) return null;
        return (
          <Marker 
            key={i}
            ref={(c) => {this._markers[i] = c}}
            image={MarkerImage}
            coordinate={{latitude: printer.location[0], longitude: printer.location[1]}}
            onPress={(e) => this.setState({selectedMarker: i})}>
            <Callout tooltip={true} onPress={() => this.props.navigation.navigate('RequestPrint', {printer: printer})}>
              <Card>
              <Grid>
                <Col size={2} style={styles.durationCol}>
                  <FontAwesome5Icon style={styles.durationIcon} size={20} name='walking' />
                  <Text style={styles.durationText}>{this.state.duration} MINS</Text>
                </Col>
                <Col size={4} style={styles.addressCol}>
                  <Text style={styles.addressText}>{this._truncateString(printer.address, 25)}</Text>
                </Col>
                <Col size={1} style={styles.arrowCol}>
                  <Icon style={styles.addressIcon} active name='keyboard-arrow-right' type='MaterialIcons' />
                </Col>
              </Grid>
            </Card>
            </Callout>
          </Marker>);
      };

      content = (
        <MapView initialRegion={this.state.currentRegion} style={styles.map} showsUserLocation={true} onPress={() => this.setState({selectedMarker: null})}>
          {this.state.printers.map(renderPrinter)}
          {this.state.selectedMarker != null && (
            <MapViewDirections
              origin={this.state.currentRegion}
              destination={this._markers[this.state.selectedMarker].props.coordinate}
              apikey={Secret.googleDirectionAPIKey} 
              strokeColor="#3F51B5"
              strokeWidth={5}
              mode="walking"
              onReady={this._onDirectionReady}
            />)}
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
  durationCol: {
    backgroundColor: '#3F51B5',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationIcon: {
    color: 'white',
    alignSelf: 'center',
  },
  durationText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
  },
  addressCol: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    alignSelf: 'center',
  },
  arrowCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};
