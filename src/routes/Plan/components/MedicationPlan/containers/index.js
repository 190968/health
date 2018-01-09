import { connect } from 'react-redux'
import MedicationPlanBody from '../components';
import Medication from '../components/Medication/components';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Query for grabbing everything for the dashboard items
export const QUERY = gql`
    query GET_MEDICATION_PLAN ($user_id: ID!, $date: Date)  {
            medicationPlan (user_id: $user_id) {
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
    }


    ${Medication.fragments.medication}
`;

const MedicationPlanBodyWithQuery = graphql(
    QUERY,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    info: data.medicationPlan,
                    loading: data.loading,

                    loadDate(date) {
                        //console.log("Какой page в props",page);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                console.log("Какой previousResult в updateQuery",previousResult);
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                            },
                        });
                    }
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