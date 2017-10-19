import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo';

import {loadNetwork} from '../routes/Network/modules/network'
import {loadUser} from '../routes/User/modules/user'
import { gql } from 'react-apollo';


/**
 * Creating a browser history
 */
import { createBrowserHistory } from 'history'
var history = createBrowserHistory();




const NETWORK_INFO = gql`
    query NETWORK_INFO {
        network {
            id,
            name,
            modules {
                id,
                name,
                placeholder
            }
        }
        
        
    }
`;
/*
,

        user {
            uid,
            first_name,
            last_name,
            thumbs {
                small,
                medium,
                large
            }
            current_role,
            roles,
            points,
            adherence
        },

        messages {
            new
        },
        notifications {
            new
        },
 */

const queryOptions =  {
    query: NETWORK_INFO
}


/**** MOVE ~THIS IN A FILES***/
/**
 * Loading planstore link async
 */

import CoreLayout from '../layouts'

/**** END MOVE ~THIS IN A FILES***/



class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        //routes: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,
    }

    // load network and token info
    componentWillMount() {
        //console.log(NetworkWithQuery.query());
        //this.props.store.dispatch(loadNetwork());

        /*this.props.client.query(queryOptions)
            .then(({ data: {network, user} }) => {
            this.props.store.dispatch(loadNetwork(network));
           // this.props.store.dispatch(loadUser(user));
              // messages
              // inbox
        })*/
        //this.fetchNetworkData();
        //console.log(this.props.fetchNetworkDataThunk());
        //console.log(this);
        //console.log('app will mount');
    }
    shouldComponentUpdate () {
        return false
    }

    render () {
        return (
            <ApolloProvider store={this.props.store} client={this.props.client}>
                <main>
                    <Router history={history}>
                        <CoreLayout store={this.props.store} />
                    </Router>
                </main>
            </ApolloProvider>
        )//<Router history={history} children={this.props.routes} />
    }
}


App.defaultProps = {
    loading: false,
    successMessage: '',
    errorMessage: '',
    /*fetchNetworkDataThunk: (dispatch) => {
        console.log(dispatch);
        //dispatch(fetchNavigationBarData())
        client.query({query}).then((results) => {
            if (results.networkStatus === 7 && results.loading === false) {
                dispatch(fetchNavigationBarDataFulFilled(results));
            }
        });
    }*/
};


export default App
