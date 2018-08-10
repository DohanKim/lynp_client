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
  Text,
  Segment,
  List,
  ListItem,
} from 'native-base';
import MenuButton from './menuButton';
import Global from '../global';

export default class PrintHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segment: 1,
      documentHistory: [],
      printerHistory: [],
    };
  }

  componentDidMount = () => {
    this._getDocumentHistory();
    this._getPrinterHistory();
  }

  _getDocumentHistory = () => {
    console.log("Get document history");
    fetch(`${Global.host}/api/print_history`, {headers : Global.headers})
      .then((res) => res.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({documentHistory: rjson});
      });
  }

  _getPrinterHistory = () => {
    console.log("Get printer history");
    fetch(`${Global.host}/api/printer_history`, { headers : Global.headers })
      .then((res) => res.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({printerHistory: rjson});
      });
  }

  render() {
    getDateFromId = (id) => {
      let timestamp = id.toString().substring(0,8);
      return new Date(parseInt(timestamp, 16) * 1000).toLocaleString();
    }

    renderDocumentHistory = (history, i) => {
      return (
        <ListItem key={i}>
          <Body>
            <Text>{history.filename}</Text>
            <Text note>Printer Owner: {history.owner}</Text>
            <Text note>{getDateFromId(history._id)}</Text>
          </Body>
          <Right>
            <Icon active name='coins' type='MaterialCommunityIcons' />
            <Text note>{history.price}</Text>
          </Right>
        </ListItem>
      );
    };
    
    renderPrinterHistory = (history, i) => {
      return (
        <ListItem key={i}>
          <Body>
            <Text>{history.filename}</Text>
            <Text note>Consumer: {history.consumer}</Text>
            <Text note>{getDateFromId(history._id)}</Text>
          </Body>
          <Right>
            <Icon active name='coins' type='MaterialCommunityIcons' />
            <Text note>{history.price}</Text>
          </Right>
        </ListItem>
      );
    };

    let noHistory = (
      <ListItem>
        <Body>
          <Text>No History Yet</Text>
        </Body>
      </ListItem>
    );
    let documentHistory = noHistory;
    if (this.state.documentHistory.length > 0) {
      documentHistory = this.state.documentHistory.map(renderDocumentHistory);
    }

    let printerHistory = noHistory;
      (<ListItem>
        <Body>
          <Text>No History Yet</Text>
        </Body>
      </ListItem>);
    if (this.state.printerHistory.length > 0) {
      printerHistory = this.state.printerHistory.map(renderPrinterHistory);
    }


    return (
      <Container style={styles.container}>
        <Header hasSegment>
          <Left>
            <MenuButton {...this.props}/>
          </Left>
          <Body>
            <Title>Print History</Title>
          </Body>
        </Header>
        <Segment>
          <Button
            active={this.state.segment === 1? true: false}
            first
            onPress={() => this.setState({segment: 1})} >
            <Text>My Documents</Text>
          </Button>
          <Button
            last
            active={this.state.segment === 2? true: false}
            onPress={() => this.setState({segment: 2})} >
            <Text>My Printers</Text>
          </Button>
        </Segment>
        <Content padder>
          <List>
            {this.state.segment == 1 && documentHistory}
            {this.state.segment == 2 && printerHistory}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};
