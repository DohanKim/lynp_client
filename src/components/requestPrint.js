import React, {Component} from 'react';
import {
} from 'react-native';
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
  Card,
  CardItem,
  Text,
  Item,
  Input,
  Footer,
  FooterTab,
} from 'native-base';
import BackButton from './backButton';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import Global from '../global';
import Toast from 'react-native-simple-toast';

export default class RequestPrint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file : null,
      printer: props.navigation.getParam('printer', {}),
    }
  }

  _pickFile = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (err, res) => {
        if(res){
          console.log(res.uri, res.type, res.fileName, res.fileSize);  
          this.setState({file: res});
        } else {
          console.log(err);
          return err;
        }
      }
    );
  }

  _requestPrint = () => {
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

    console.log(body);
    console.log(headers);

    fetch(`${Global.host}/api/print`, {
      method : 'POST',
      headers : headers,
      body : body
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        Toast.show(data.msg);
      });
    }).catch((err) => console.log(err));
  }

  render() {
    // TODO: put color on icons and text
    return (
      <Container>
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
          <Card>
            <CardItem header bordered>
              <Text>{this.state.printer.name}</Text>
            </CardItem>
            <CardItem>
              <Icon active name='printer' type='MaterialCommunityIcons' />
              <Text>Model</Text>
              <Right>
                <Text>{this.state.printer.model}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name='color-palette' />
              <Text>Color</Text>
              <Right>
                <Text>{this.state.printer.isColorAvailable? 'Yes': 'No'}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name='coins' type='MaterialCommunityIcons' />
              <Text>Cost</Text>
              <Right>
                <Text>{this.state.printer.cost}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name='person' />
              <Text>Owner</Text>
              <Right>
                <Text>{this.state.printer.owner}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name='address' type='Entypo' />
              <Text>Address</Text>
              <Right>
                <Text>{this.state.printer.address}</Text>
              </Right>
            </CardItem>
          </Card>
          <Item style={styles.fileForm}>
            <Icon active name='attachment' type='Entypo' style={styles.fileIcon} />
            <Input disabled style={styles.fileName} placeholder={this.state.file? this.state.file.fileName: ''}/>
            <Button light style={styles.selectButton} onPress = {this._pickFile}>
              <Text>Select File</Text>
            </Button>
          </Item>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button disabled={this.state.file == null} full onPress={this._requestPrint}>
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
  footer: {
  },
  footerTab: {
  },
  footerText: {
    color: 'white',
    fontSize: 15,
  },
};
