import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'

import {loadNetwork, setCurrentRole} from '../routes/Network/modules/network'
import {loadUser,loadUserFAIL} from '../routes/User/modules/user'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


/**
 * Creating a browser history
 */
import { createBrowserHistory } from 'history'
var history = createBrowserHistory();


/**
 * Preparing query
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
            user {
                id,
                first_name,
                last_name,
                token,
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


import CoreLayout from '../layouts'

/**
 * Main App
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false } ;
    };
    static propTypes = {
        store: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,
    }

    // load network and token info
    componentWillMount() {
        this.props.client.query(queryOptions)
            .then(({ data: {network, account: {user, current_role}} }) => {
                this.setState({loading: false});
                this.props.store.dispatch(loadNetwork(network));
                if (user.token != '') {
                    this.props.store.dispatch(loadUser(user));
                    //console.log( this.props.store);
                    this.props.store.dispatch(setCurrentRole(current_role));
                } else {
                    this.props.store.dispatch(loadUserFAIL(user));
                }
            })
    }
    shouldComponentUpdate () {
        return false
    }

    render () {
        //console.log(this.props.store);
        return (

            <ApolloProvider client={this.props.client}>
                <Provider store={this.props.store}>
                    <Router history={history}>
                        <CoreLayout store={this.props.store} />
                    </Router>
                </Provider>
            </ApolloProvider>


        )
    }
}

App.defaultProps = {
    loading: false,
    successMessage: '',
    errorMessage: ''
};

export default App
