import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Text,
  Icon,
  Title,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import BackButton from './backButton';

export default class PrintResult extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <BackButton {...this.props}/>
          </Left>
          <Body>
            <Title>Print Result</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button full onPress={this._addPrinter}>
              <Icon active name='add' />
              <Text style={styles.footerText}>Add</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
};
