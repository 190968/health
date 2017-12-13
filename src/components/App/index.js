import React, { Component } from 'react';
// adding proptypes
import PropTypes from 'prop-types'

// adding router
import { Router } from 'react-router-dom'

import apolloClient from '../../clients/apolloClient';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'
import gql from 'graphql-tag';
//import logo from './logo.svg';
//import './App.css';
//core
import Core from '../../layouts'
import {loadNetwork, setCurrentRole} from 'routes/Network/modules/network'
import {loadUser, loadUserFAIL} from 'routes/User/modules/user'

// adding locales
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import es from 'react-intl/locale-data/es';



/**
 * Creating a browser history
 */
import { createBrowserHistory } from 'history'
// locale
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import esEs from 'antd/lib/locale-provider/es_ES';

var history = createBrowserHistory();
// Adding Locale data
addLocaleData([...en, ...ru, ...es]);



/**
 * Preparing query to grab the main info
 */
const NETWORK_INFO = gql`
    query NETWORK_INFO {
        network {
            id,
            name,
            logo,
            modules {
                id,
                name,
                placeholder
            }
        },
        account {
            checkToken
            user {
                id,
                first_name,
                last_name,
                token,
                phoneConfirmed,
                new_notifications,
                new_messages
            }
            current_role

        }
    }
`;

const queryOptions =  {
    query: NETWORK_INFO,
}


class App extends React.Component {
    constructor(props) {
        super(props);
        //this.state = { loading: true } ;
    };
    static propTypes = {
        store: PropTypes.object.isRequired,
        //locale: 'en'
    }
    // load network and token info
    componentWillMount() {
        apolloClient.query(queryOptions)
            .then(({ data: {network, account: {user,checkToken, current_role}} }) => {
                //this.setState({loading: false});
                if (checkToken) {
                    this.props.store.dispatch(loadUser(user));
                    //console.log( this.props.store);
                    //this.props.store.dispatch(setCurrentRole(current_role));
                } else {
                    this.props.store.dispatch(loadUserFAIL(user));
                }
                this.props.store.dispatch(loadNetwork(network));
            })
        // })
    }

    shouldComponentUpdate () {
        return false
    }

    render() {

        return (
            <ApolloProvider client={apolloClient}>
                <IntlProvider locale={'en'}>
                <Provider store={this.props.store}>
                    <Router history={history}>

                        <LocaleProvider locale={enUS}>

                                <Core store={this.props.store} />

                        </LocaleProvider>

                    </Router>
                </Provider>
                </IntlProvider>
            </ApolloProvider>
        );
    }
}

export default App;