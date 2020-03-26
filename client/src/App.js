import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Alerts from './components/layout/Alerts'
import Home from './components/pages/Home'
import Admin from './components/pages/Admin'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AuthState from './context/auth/AuthState'
import AboutState from './context/about/AboutState'
import ServiceState from './context/service/ServiceState'
import PostState from './context/post/PostState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <AboutState>
        <ServiceState>
          <PostState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className="container">
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/admin' component={Admin} />
                      <Route exact path='/' component={Home} />
                      <Route exact path='/login' component={Login} />
                      <PrivateRoute exact path='/register' component={Register} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </PostState>
        </ServiceState>
      </AboutState>
    </AuthState>
  );
}

export default App;
