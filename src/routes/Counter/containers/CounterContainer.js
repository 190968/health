import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/counter'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Counter from '../components/Counter'
import { gql,graphql } from 'react-apollo';

const CURRENT_PLANS = gql`
    query GET_PLANS {
        plans {
            actionplans {
                id,
                title,
                thumb {
                    original
                    wide
                }
            }
        }
    }
`;

// 1- add queries:
const CounterWithQuery = graphql(
    CURRENT_PLANS,
    {
        props: ({ ownProps, data }) => ({
            loading:data.loading,
            increment() {
                 ownProps.increment(data.plans['actionplans']);
            },
            doubleAsync() {
                 // reset list of plans
                ownProps.increment([]);
            }
        }),

    }
)(Counter);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        plans:       state.plans,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (info) => {dispatch(increment(info))},
        doubleAsync
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterWithQuery);