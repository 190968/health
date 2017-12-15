import { connect } from 'react-redux'
import DashLayout from 'routes/Dash/components/DashUserLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Plan from 'routes/Plan/components/Plan';
import Medication from 'routes/Plan/components/MedicationPlan/components/Medication/components';

// Query for grabbing everything for the dashboard items
const QUERY = gql`
    query GET_DASH_PLANS ($user_id: ID)  {
        account {
            plans (user_id: $user_id)  {
                ...PlanCardInfo
            }

            medicationPlan {
                id
                upid
                isPersonal
                medicationsByType {
                    takeDaily {
                        ...MedicationCardInfo
                    }
                    takeAsNeeded {
                        ...MedicationCardInfo
                    }
                    

                    
                }
                textBefore
                textAfter
            }
        }
    }
   
    
    ${Plan.fragments.plan}
    ${Medication.fragments.medication}
`;
/*
 takeAtTimes {
        ...MedicationCardInfo
        timesPerHour {
            id
            time
            quantity
        }
    }
 */

const DashLayoutWithQuery = graphql(
    QUERY,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    plans: data.account.plans,
                    medicationPlan: data.account.medicationPlan,
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