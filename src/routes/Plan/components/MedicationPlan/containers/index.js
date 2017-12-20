import { connect } from 'react-redux'
import MedicationPlanBody from '../components';
import Medication from '../components/Medication/components';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Query for grabbing everything for the dashboard items
const QUERY = gql`
    query GET_MEDICATION_PLAN ($user_id: ID)  {
        account {
            medicationPlan (user_id: $user_id) {
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


    ${Medication.fragments.medication}
`;

const MedicationPlanBodyWithQuery = graphql(
    QUERY,
    {
        props: ({ ownProps, data }) => {
            console.log(ownProps);
            console.log(data);
            if (!data.loading) {
                return {
                    info: data.account.medicationPlan,
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
            //fetchPolicy: 'cache-first'//'cache-only'//'cache-and-network'
        }),
    }
)(MedicationPlanBody);

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
)(MedicationPlanBodyWithQuery);