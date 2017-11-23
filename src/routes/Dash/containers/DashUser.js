import { connect } from 'react-redux'
import DashLayout from 'routes/Dash/components/DashUserLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from 'routes/Plan/components/Plan';

// Query for grabbing everything for the dashboard items
const QUERY = gql`
    query GET_DASH_PLANS ($user_id: ID)  {
        account {
            plans (user_id: $user_id)  {
                ...PlanCardInfo
            }
        }
    }
    ${Plan.fragments.plan}
`;

const DashLayoutWithQuery = graphql(
    QUERY,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plans: data.account.plans,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            variables: {
                user_id:ownProps.user_id,
            },
            fetchPolicy: 'network-only'
        }),
    }
)(DashLayout);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashLayoutWithQuery);