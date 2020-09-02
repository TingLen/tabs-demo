import React from 'react'
import cookies from "react-cookies"
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from "./pages/login/login_page"
import NotFound from "./pages/not_found"

export function isLogin() {
  return cookies.load("dtchain-token")
}

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route {...rest} render={props =>
      !isLogin()
        ? <Component {...props} />
        : <Redirect to={{pathname: "/login", state: {from: props.location}}}
        />
    }/>
  )
}

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/navigator" push />} />
      <Route path="/login" render={props =>
        isLogin()
          ? <Redirect to={{pathname: "/", state: {from: props.location}}}/>
          : <Login {...props} />
      } />
      <PrivateRoute component={App} />
      <Route component={NotFound}/>
    </Switch>
  </Router>
)
