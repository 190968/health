import { connect } from 'react-redux'
import BiometricPlanBody from '../components';
import Biometric from '../components/Biometric/components';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Query for grabbing everything for the dashboard items
const QUERY = gql`
    query GET_BIOMETRIC_PLAN ($user_id: ID, $date: Date)  {
        account {
        user{
        id
        },
            biometricPlan (user_id: $user_id, date: $date) {
                id
                upid
                isPersonal
                columns {
                    id
                    name
                }
                trackers {
                    ...BiometricCardInfo
                    columns
                }
                startDate
                endDate
            }
        }
    }


    ${Biometric.fragments.tracker}
`;

const BiometricPlanBodyWithQuery = graphql(
    QUERY,
    {
        props: ({ ownProps, data }) => {

            if (!data.loading) {
                return {
                    info: data.account.biometricPlan,
                    user_id:data.account.user.id,
                    loading: data.loading
                }
            } else {
                return {loading: data.loading}
            }
        },
        options: (ownProps) => ({
            variables: {
                user_id:ownProps.user_id,
                date:ownProps.date,
            },
            //fetchPolicy: 'cache-first'//'cache-only'//'cache-and-network'
        }),
    }
)(BiometricPlanBody);

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
)(BiometricPlanBodyWithQuery);