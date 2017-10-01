import { connect } from 'react-redux'
//import { increment, doubleAsync } from '../modules/counter'


import Network from '../components/Network'
import { gql,graphql } from 'react-apollo';

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

// 1- add queries:
const NetworkWithQuery = graphql(
    NETWORK_INFO,
    {
        //name: 'NetworkInfoQuery',
        props: ({ ownProps, data }) => {
        //console.log(data);
            if (!data.loading) {
                //console.log(ownProps);
                const network = data.network;
                //console.log(data);
                //console.log(network);
                return {
                    network: network,
                    //modules: data.network.modules,
                    loading: data.loading,
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading}
            }
        },

    }
)(Network);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        'network':state.network
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //increment: (info) => {dispatch(increment(info))},
        //doubleAsync
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkWithQuery);