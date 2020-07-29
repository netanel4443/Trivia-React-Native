import 'react-native-gesture-handler'; //has to be first!
import React from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainScreen from './src/MainScreen'
import GameScreen from './src/screens/GameScreen'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers/rootReducer'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import thunk from 'redux-thunk'

const store= createStore(rootReducer,applyMiddleware(thunk));
const Stack = createStackNavigator();

const trivia=()=>(
  <Provider store={store}>
 <NavigationContainer>
  <Stack.Navigator initialRouteName="MainScreen">
     <Stack.Screen name="MainScreen" component={MainScreen} />
     <Stack.Screen name="GameScreen" component={GameScreen}
     options={{
      headerLeft:null
     }} />
   </Stack.Navigator>
 </NavigationContainer>
 </Provider>
)

AppRegistry.registerComponent(appName, () => trivia);
