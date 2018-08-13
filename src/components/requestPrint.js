import React, {Component} from 'react';
import {
  Alert,
} from 'react-native';
import {
  Container,
  Grid,
  Col,
  Row,
  Header,
  Left,
  Button,
  Right,
  Body,
  Title,
  Content,
  Icon,
  Card,
  CardItem,
  Text,
  Item,
  Input,
  Footer,
  FooterTab,
} from 'native-base';
import BackButton from './backButton';
import PrinterCard from './printerCard';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import Global from '../global';
import Toast from 'react-native-simple-toast';
import OverlaySpinner from 'react-native-loading-spinner-overlay';

export default class RequestPrint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file : null,
      printer: props.navigation.getParam('printer', {}),
      numberOfPages: 0,
      isLoading: false,
      user: null,
    }
  }

  componentWillMount() {
    this._getUserInformation();
  }

  _getUserInformation = () => {
    fetch(`${Global.host}/api/me`, {
      method : 'GET',
      headers : Global.headers,
    })
      .then((response) => response.json())
      .then((rjson) => {
        this.setState({user: rjson});
        console.log("USER", rjson);
      })
      .catch((err) => console.log(err));
  }


  _pickFile = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (err, res) => {
        if (res){
          console.log(res);

          if (res.type.includes('image/')) {
            this.setState({numberOfPages: 1});
          } else if (res.type.includes('pdf')) {
            this.setState({numberOfPages: 1});
          } else {
            this.setState({numberOfPages: 1});
          }

          this.setState({file: res});
        } else {
          console.log(err);
          return err;
        }
      }
    );
  }

  _requestPrint = () => {
    this.setState({isLoading: true});
    const file = {
      uri : this.state.file.uri,
      type : this.state.file.type,
      name : this.state.file.fileName,
    };

    let body = new FormData();
    console.log(this.state.printer);
    body.append("printer_id", this.state.printer.printerId);
    body.append("file", file);

    let headers = Global.headers;
    headers['Content-Type'] = 'multipart/form-data';

    fetch(`${Global.host}/api/print`, {
      method : 'POST',
      headers : headers,
      body : body
    })
      .then((response) => response.json())
      .then((rjson) => {
        this.setState({isLoading: false});
        console.log(rjson);
        this.props.navigation.navigate('PrintResult', {result: rjson});
      })
      .catch((err) => console.log(err));
  }

  _onButtonPress = () => {
    if (!this.state.user.card.number) {
      Alert.alert('Payment information is not registered.');
      return;
    }

    Alert.alert(
      'Payment Confirmation',
      `Total Cost: $ ${this.state.printer.cost * this.state.numberOfPages}`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: this._requestPrint},
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <Container>
        <OverlaySpinner visible={this.state.isLoading} textContent={"Sending Request..."} textStyle={{color: '#FFF'}} />
        <Header>
          <Left>
            <BackButton {...this.props}/>
          </Left>
          <Body>
            <Title>Request Print</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <PrinterCard printer={this.state.printer} />
          <Item style={styles.fileForm} first>
            <Icon active name='attachment' type='Entypo' style={styles.fileIcon} />
            <Input disabled style={styles.fileName} placeholder={this.state.file? this.state.file.fileName: ''}/>
            <Button light style={styles.selectButton} onPress = {this._pickFile}>
              <Text>Select File</Text>
            </Button>
          </Item>
          <Grid>
            <Col size={1}>
              <Item style={styles.pages}>
                <Icon active name='documents' type='Entypo' />
                <Input 
                  disabled 
                  placeholder={`${this.state.numberOfPages} page`} />
              </Item>
            </Col>
            <Col size={1}>
              <Item style={styles.price}>
                <Icon active name='coins' type='MaterialCommunityIcons' />
                <Input 
                  disabled 
                  placeholder={`Price $ ${this.state.printer.cost * this.state.numberOfPages}`} />
              </Item>
            </Col>
          </Grid>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button style={styles.footerButton} disabled={this.state.file == null} full onPress={this._onButtonPress}>
              <Icon active name='printer' type='MaterialCommunityIcons' />
              <Text style={styles.footerText}>Print</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  fileForm: {
    padding: 10,
  },
  fileIcon: {
    marginTop: 14,
  },
  fileName: {
    marginTop: 14,
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    marginTop: 20,
  },
  pages: {
    padding: 10,
  },
  price: {
    padding: 10,
  },
  priceIcon: {
  },
  priceText: {
  },
  footer: {
  },
  footerTab: {
  },
  footerButton: {
  },
  footerText: {
    color: 'white',
    fontSize: 15,
  },
};
