import { connect } from 'react-redux'
import DashLayout from 'routes/Dash/components/DashUserLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Plan from 'routes/Plan/components/Plan';
import Medication from 'routes/Plan/components/MedicationPlan/components/Medication/components';
import Biometric from 'routes/Plan/components/BiometricPlan/components/Biometric/components';


// Query for grabbing everything for the dashboard items
const QUERY = gql`
    query GET_DASH_PLANS ($user_id: ID, $date: Date)  {
        account {
            plans (user_id: $user_id)  {
                ...PlanCardInfo
            }

            medicationPlan ( date: $date) {
                id
                upid
                isPersonal
                medicationsByType (date: $date) {
                    takeAtTimes {
                        ...MedicationCardInfo
                        timesPerHour {
                            id
                            time
                            quantity
                        }
                    }
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

            biometricPlan ( date: $date) {
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
   
    
    ${Plan.fragments.plan}
    ${Medication.fragments.medication}
    ${Biometric.fragments.tracker}
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
                date:ownProps.date
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
        date: moment().format('YYYY-MM-DD')
       // user_id: state.user.info.id
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