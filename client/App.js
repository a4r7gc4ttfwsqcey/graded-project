import React from "react";
import Home from "./components/home";
import List from "./components/list";
import Login from "./components/login";
import Show from "./components/show";
import Edit from "./components/edit";
import Filter from "./components/filter";
import New from "./components/new";
import { NativeRouter, Switch, Route } from "react-router-native";
import { Provider } from "react-redux";
import store from "./reducers/main";
export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/new" exact>
            <New />
          </Route>
          <Route path="/show/:id">
            <Show />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/filter" exact>
            <Filter />
          </Route>
          <Route path="/list">
            <List />
          </Route>
        </Switch>
      </NativeRouter>
    </Provider>
  );
}
