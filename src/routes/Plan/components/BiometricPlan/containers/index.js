import { connect } from 'react-redux'
import BiometricPlanBody from '../components';
import Biometric from '../components/Biometric/components';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Query for grabbing everything for the dashboard items
export const BiometricPlanQuery = gql`
    query GET_BIOMETRIC_PLAN ($user_id: ID, $date: Date)  {
            biometricPlan (userId: $user_id) {
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


    ${Biometric.fragments.tracker}
`;

const BiometricPlanBodyWithQuery = graphql(
    BiometricPlanQuery,
    {
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.biometricPlan,
                    loading: data.loading,

                    loadDate(date, user_id) {
                        //console.log(date);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                date: date,
                                user_id: user_id,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};
                                //console.log(fetchMoreResult);
                                //fetchMoreResult.date = date;
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                            //fetchPolicy: 'cache-first'//'cache-only'//'cache-and-network'
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

        }),
    }
)(BiometricPlanBody);



const deleteTracker = gql`
    mutation trackerDelete($id: ID!, $uid: ID!) {
        trackerDelete(id:$id, uid: $uid)
    }
`;



const withDeleteMutation = graphql(deleteTracker, {
    props: ({ mutate }) => ({
        trackerDelete: (id, uid, date) => {
            return mutate({
                variables: { uid: uid, id: id },

                refetchQueries: [{
                    query: BiometricPlanQuery,
                    variables: { user_id: uid, date:date },
                }],

                /*update: (store, { data: { medicationDelete } }) => {
                    // Read the data from our cache for this query.
                    const data = store.readQuery({ query: deleteMed });

                    console.log(data);
                    // Add our comment from the mutation to the end.
                    //data.comments.push(medicationDelete);
                    // Write our data back to the cache.
                    //store.writeQuery({ query: CommentAppQuery, data });
                },*/
            })
        },

    }),
});

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



export default withDeleteMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(BiometricPlanBodyWithQuery));