import React  from 'react';
// adding proptypes
import PropTypes from 'prop-types'
import IdleTimer from 'react-idle-timer';
// adding router
import { Router } from 'react-router-dom'

import apolloClient from '../../clients/apolloClient';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'
import gql from 'graphql-tag';
//import logo from './logo.svg';
//
//core
import Core from '../../layouts'
import {loadNetwork, setCurrentRole} from 'routes/Network/modules/network'
import {loadUser, loadUserFAIL} from 'routes/User/modules/user'
// import {Modal} from 'routes/Modal/components/index'
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
                new_messages,
                motivators {
                    totalCount,
                  edges{
                    id,
                    user {
                      id,
                      first_name,
                      email
                    },
                    email
                  }
                }
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
                    console.log(user);
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
                            {/*<Modal>*/}
                            {/*<IdleTimer*/}
                                {/*ref="idleTimer"*/}
                                {/*element={document}*/}
                                {/*activeAction={this._onActive}*/}
                                {/*idleAction={онклик}*/}
                                {/*timeout={1000}*/}
                                {/*format="MM-DD-YYYY HH:MM:ss.SSS">*/}
                                    <Core store={this.props.store} />
                            {/*</IdleTimer>*/}
                            {/*</Modal>*/}
                        </LocaleProvider>
                    </Router>
                </Provider>
                </IntlProvider>
            </ApolloProvider>

        );
    }
}

export default App;