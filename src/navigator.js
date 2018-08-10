import React, {Component} from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import NearbyPrinters from './components/nearbyPrinters';
import RequestPrint from './components/requestPrint';
import MyPrinters from './components/myPrinters';
import NewPrinter from './components/newPrinter';
import ChargeBalance from './components/chargeBalance';
import NewCard from './components/newCard';
import DocumentHistory from './components/documentHistory';
import PrinterHistory from './components/printerHistory';
import MyAccount from './components/myAccount';
import SideBar from './components/sideBar';

const PrintStack = createStackNavigator(
  {
    NearbyPrinters: {screen: NearbyPrinters},
    RequestPrint: {screen: RequestPrint},
  }, 
  {
    initialRouteName: 'NearbyPrinters',
    headerMode: 'none',
  }
);
const PrinterStack = createStackNavigator(
  {
    MyPrinters: {screen: MyPrinters},
    NewPrinter: {screen: NewPrinter},
  },
  {
    initialRouteName: 'MyPrinters',
    headerMode: 'none',
  }
);
const PaymentStack = createStackNavigator(
  {
    ChargeBalance: {screen: ChargeBalance},
    NewCard: {screen: NewCard},
  },
  {
    initialRouteName: 'ChargeBalance',
    headerMode: 'none',
  }
);
const HistoryStack = createStackNavigator(
  {
    DocumentHistory: {screen: DocumentHistory},
    PrinterHistory: {screen: PrinterHistory},
  },
  {
    initialRouteName: 'DocumentHistory',
    headerMode: 'none',
  }
);
const SettingStack = createStackNavigator(
  {
    MyAccount: {screen: MyAccount},
  },
  {
    initialRouteName: 'MyAccount',
    headerMode: 'none',
  }
);

const Navigator = createDrawerNavigator(
  {
    Print: {screen: PrintStack},
    Printer: {screen: PrinterStack},
    Payment: {screen: PaymentStack},
    History: {screen: HistoryStack},
    Setting: {screen: SettingStack},
  }, 
  {
    initialRouteName: 'Print',
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    contentComponent: ((props) => <SideBar {...props} />)
  }
);

export default Navigator;
