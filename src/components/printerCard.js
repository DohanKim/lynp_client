import React, {Component} from 'react';
import {
  Icon,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Text,
} from 'native-base';

export default class PrinterCard extends Component {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{this.props.printer.name}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='printer' type='MaterialCommunityIcons' />
            <Text>Model</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.model}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='color-palette' />
            <Text>Color</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.isColorAvailable? 'Yes': 'No'}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='coins' type='MaterialCommunityIcons' />
            <Text>Cost</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.cost}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='person' />
            <Text>Owner</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.owner}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='address' type='Entypo' />
            <Text>Address</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.address}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name='numeric' type='MaterialCommunityIcons' />
            <Text>ID</Text>
          </Left>
          <Body>
            <Text>{this.props.printer.printerId}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
