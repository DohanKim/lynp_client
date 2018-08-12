import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Text,
  View,
  Icon,
  Title,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import BackButton from './backButton';

export default class PrintResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: props.navigation.getParam('result', {}),
    }

    console.log(this.state);
  }

  render() {
    let content;
    if (this.state.result.success) {
      content = <Icon style={[styles.icon, styles.success]} active name='check-circle' type='FontAwesome' />
    } else {
      content = <Icon style={[styles.icon, styles.fail]} active name='circle-with-cross' type='Entypo' />
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Printing Result</Title>
          </Body>
          <Right />
        </Header>
        <View padder style={styles.content}>
          {content}
          <Text style={styles.text}>{this.state.result.msg}</Text>
        </View>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button full onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.footerText}>Close</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 120,
  },
  success: {
    color: '#0e9641',
  },
  fail: {
    color: '#d41515',
  },
  text: {
    color: '#4e4e4e',
    fontSize: 20,
  },
  footerText: {
    color: 'white',
    fontSize: 15,
  },
};
