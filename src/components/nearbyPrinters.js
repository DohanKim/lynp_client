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
import CircleImage from '../../assets/circle.png';
import SmallCircleImage from '../../assets/small_circle.png';
import CurrentLocation from '../../assets/current_location.png';
import Secret from '../secret';

export default class NearbyPrinters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: null,
      printers: null,
      selectedRegion: null,
    }
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

  _showDirection = () => {
    if(this.state.selectedRegion) {
      console.log("Show Direction");
      const currentRegion = {
        latitude : this.state.currentRegion.latitude,
        longitude : this.state.currentRegion.longitude,
      };

      return(
        <MapViewDirections
          origin={currentRegion}
          destination={this.state.selectedRegion}
          apikey={Secret.googleDirectionAPIKey} 
          strokeColor="hotpink"
          strokeWidth={3}
          mode="walking"
        />
      );
    }
    else {
      return null;
    }
  }

  render() {
    let content;
    if (this.state.currentRegion && this.state.printers) {
      let renderPrinter = (printer) => {
        if (!printer.isOn) return null;
        return (
          // TODO: change marker icon
          // Showing Route?
          <Marker key={printer._id}
            image={MarkerImage}
            coordinate={{latitude: printer.location[0], longitude: printer.location[1]}}
            onPress={e => this.setState({selectedRegion: e.nativeEvent.coordinate})}>
            <Callout tooltip={true} onPress={() => this.props.navigation.navigate('RequestPrint', {printer: printer})}>
              <Card>
              <Grid>
                <Col size={1} style={styles.costCol}>
                  <Icon style={styles.costIcon} active name='coins' type='MaterialCommunityIcons' />
                  <Text style={styles.costText}>{printer.cost}</Text>
                </Col>
                <Col size={3} style={styles.addressCol}>
                  <Text style={styles.addressText}>{printer.address}</Text>
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
        <MapView initialRegion={this.state.currentRegion} style={styles.map} showsUserLocation={true} onPress={() => this.setState({selectedRegion: null})}>
          {this.state.printers.map(renderPrinter)}
          {this._showDirection()}
        </MapView>);
    } else {
      content = <Spinner />;
    }

    console.log(this.state);

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
  costCol: {
    backgroundColor: '#3F51B5',
    padding: 4,
  },
  costIcon: {
    color: 'white',
    alignSelf: 'center',
  },
  costText: {
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
