import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  View,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';
import BackButton from './backButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, Callout} from 'react-native-maps';
import MarkerImage from '../../assets/marker_image.png';
import Secret from '../secret';

export default class FindLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      address: null,
    };
  }

  _setRegion = (details) => {
    console.log(details);
    const region = {
      latitude : details.geometry.location.lat,
      longitude : details.geometry.location.lng,
      latitudeDelta : 0.002,
      longitudeDelta : 0.002,
    };

    this.setState({region: region, address: details.formatted_address});
  }

  render() {
    let marker = null;
    if (this.state.region) {
      marker = (<Marker image={MarkerImage} coordinate = {{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} />);
    }

    return (
      <Container>
        <Header>
          <Left>
            <BackButton {...this.props}/>
          </Left>
          <Body>
            <Title>Enter the Address</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder='Address'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            listViewDisplayed={false}
            fetchDetails={true}
            renderDescription={(row) => {conosle.log(row); return row.description;}}
            onPress={(data, details = null) => {
              this._setRegion(details);
            }}
            getDefaultValue={() => ''}
            query={{
              key: Secret.googlePlaceAPIKey,
              language: 'en', // language of the results
            }}
            styles={styles.placeSearch}
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 
            debounce={10}
          />
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeComplete = {(region) => this.setState({region : region})}>
            {marker}
          </MapView>
        </View>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button full disabled={this.state.region == null} onPress={() => this.props.navigation.navigate('NewPrinter', {region: this.state.region, address: this.state.address})}>
              <Icon active name='arrow-right' type='Entypo' />
              <Text style={styles.footerText}>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  placeSearch: {
    containerTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom : 0,
      // alignItems: 'center',
      // justifyContent: 'flex-start',
      zIndex : 1,
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    padding: { 
      padding: 20,
    },
    listView: {
      backgroundColor: '#ffffff',
      zIndex : 1,
      elevation: 1,
    },
    textInputContainer: {
      borderBottomWidth: 0,
      borderTopWidth: 0,
    },
    textInput: {
      color: '#00539b',
      fontSize: 16,
    },
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#fede00',
    },
  },
  mapContainer: {
    flex: 1,
  },
  map : {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    bottom: 0,
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
