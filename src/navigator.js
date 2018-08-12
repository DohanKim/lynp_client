import React, {Component} from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import NearbyPrinters from './components/nearbyPrinters';
import RequestPrint from './components/requestPrint';
import PrintResult from './components/printResult';
import MyPrinters from './components/myPrinters';
import FindLocation from './components/findLocation';
import NewPrinter from './components/newPrinter';
import ChargeBalance from './components/chargeBalance';
import NewCard from './components/newCard';
import PrintHistory from './components/printHistory';
import MyAccount from './components/myAccount';
import SideBar from './components/sideBar';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

const PrintStack = createStackNavigator(
  {
    NearbyPrinters: {screen: NearbyPrinters},
    RequestPrint: {screen: RequestPrint},
    PrintResult: {screen: PrintResult},
  }, 
  {
    initialRouteName: 'NearbyPrinters',
    headerMode: 'none',
  }
);
const PrinterStack = createStackNavigator(
  {
    MyPrinters: {screen: MyPrinters},
    FindLocation: {screen: FindLocation},
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
    PrintHistory: {screen: PrintHistory},
  },
  {
    initialRouteName: 'PrintHistory',
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

const DrawerNavigator = createDrawerNavigator(
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

const AuthStack = createStackNavigator(
  { 
    SignIn: SignIn,
    SignUp: SignUp,
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
  }
);

const Navigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default Navigator;
