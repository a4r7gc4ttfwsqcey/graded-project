import React from 'react';
import Home from './components/home';
import List from './components/list';
import Login from './components/login';
import { NativeRouter, Switch, Route } from 'react-router-native'
import { Provider } from 'react-redux'
import store from './reducers/main'
export default function App() {
  return(<Provider store={store}>
    <NativeRouter>
    <Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/login' exact>
						<Login />
					</Route>
					<Route path='/list'>
						<List />
					</Route>
				</Switch>
</NativeRouter>
</Provider>)
}