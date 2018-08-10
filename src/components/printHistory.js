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
} from 'native-base';
import BackButton from './backButton';

export default class PrintHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segment: 1,
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header hasSegment>
          <Left>
            <BackButton {...this.props}/>
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
          {this.state.segment === 1 && <Text>Puppies Selected</Text>}
          {this.state.segment === 2 && <Text>Cubs Selected</Text>}
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
