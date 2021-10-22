import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// import ApiDomainContextProvider from './context/ApiDomainContextProvider';
import AuthContextProvider from './context/AuthContextProvider';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageNavbar from './components/PageNavbar';
import {
    Home,
    Posts,
    SinglePost,
    Login,
    Dashboard
} from '../src/Pages/index'


function App() {
    axios.defaults.baseURL = 'http://localhost/wordpress'

    return (
      // <ApiDomainContextProvider>
          <AuthContextProvider>
              <Router>
                  <div className='page-container'>
                      <PageNavbar />
                      <div className='main-wrapper'>
                          <Switch>
                              <Route exact path='/' component={Home} />
                              <Route path='/posts' component={Posts} />
                              <Route path='/post/:id' component={SinglePost} />
                              <Route path='/login' component={Login} />
                              <Route path='/dashboard' component={Dashboard} />
                          </Switch>
                      </div>
                  </div>
              </Router>
          </AuthContextProvider>
      // </ApiDomainContextProvider>
    );
}

export default App;
