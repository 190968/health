import React, { Component } from 'react';
// adding proptypes
import PropTypes from 'prop-types'

// adding router
import { Router } from 'react-router-dom'

import apolloClient from '../../clients/apolloClient';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'
//import logo from './logo.svg';
//import './App.css';
//core
import Core from '../../layouts'
/**
 * Creating a browser history
 */
import { createBrowserHistory } from 'history'
// locale
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
var history = createBrowserHistory();







class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false } ;
    };
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    shouldComponentUpdate () {
        return false
    }

  render() {
    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={this.props.store}>
                <Router history={history}>
                    <LocaleProvider locale={enUS}>
                        <Core store={this.props.store} />
                    </LocaleProvider>
                </Router>
            </Provider>
        </ApolloProvider>
    );
  }
}

export default App;
