/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import TrackerModalForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from "antd/lib/index";
import {BiometricPlanQuery} from "../../../../../containers";
//import { compose } from 'react-apollo';

const tracker = gql`
query GET_TRACKER($id: ID, $user_id: ID!, $drugId: ID) {
    biometricPlan ( userId: $user_id) {
        id
        columns {
          id
          name
        }
    }
   tracker (id: $id, userId: $user_id) {
          id,
        measurement (amid:$drugId) {
          id
          label
          graph
        },
        criticalRange {
          min
          max
        },
        normalRange {
          min
          max
        },
        timesToReport,
        columns
  }
}
`;
const updateTrackerMutate=gql`
 mutation TrackerUpdate($id: ID, $userId: ID!, $input: TrackerInput!) {
        trackerUpdate(id:$id, userId: $userId, input: $input) {
              id,
            measurement {
              id
              label
              graph
            },
            criticalRange {
              min
              max
            },
            normalRange {
              min
              max
            },
            timesToReport,
            columns
        }
    }
`;
const addMutation=gql`
 mutation TrackerAdd($userId: ID!, $input: TrackerInput!) {
        trackerAdd(userId: $userId, input: $input) {
              id,
                measurement {
                  id
                  label
                  graph
                },
                criticalRange {
                  min
                  max
                },
                normalRange {
                  min
                  max
                },
                timesToReport,
                columns
        }
    }
`;



const withQuery = graphql(tracker,
    {
        options: (ownProps) => {
        //console.log(ownProps);
        return   {
            variables: {
                user_id: ownProps.userId,
                id: ownProps.id,
                drugId: ownProps.drugId,

            },
            fetchPolicy: 'network-only'
        }},
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.tracker,
                    columns: data.biometricPlan.columns,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading,info:12}
            }
        },
    }
)(TrackerModalForm);

const withMutation = graphql(updateTrackerMutate, {
    props: ({ mutate }) => ({
        updateTracker: (id, uid, input, onCancel) => {
            return mutate({
                variables: {id:id, userId:uid, input: {details:input}},

                update: (store, { data: { trackerUpdate } }) => {
                    //console.log(trackerUpdate);
                    // Read the data from our cache for this query.
                    /*const data = store.readQuery({
                        query: tracker,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });*/
                    if (id) {
                        // add new to the list
                    }

                    // console.log(data);
                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    if (trackerUpdate.id) {
                        store.writeQuery({
                            query: tracker,
                            data: {tracker: trackerUpdate},
                            variables: {
                                id: trackerUpdate.id,
                                user_id: uid
                            }
                        });
                    } else {
                        store.writeQuery({
                            query: tracker,
                            data: {tracker: trackerUpdate},
                            variables: {
                                id: id,
                                user_id: uid
                            }
                        });
                        //console.log(trackerUpdate, 'need to append');
                    }
                },
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })},
    }),
});

export const TrackerAddForm = graphql(addMutation, {
    props: ({ mutate }) => ({
        updateTracker: (id, uid, input, date, onCancel) => {
            return mutate({
                variables: {userId:uid, input: {details:input}},
                refetchQueries: [{
                    query: BiometricPlanQuery,
                    variables: { user_id: uid, date:date },
                }],
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })},
    }),
})(withQuery);



const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onSubmit: (values) => {
    //     values.birthday = values.birthday.format("YYYY-MM-DD")
    //     values.phone = [values.prefix, values.phone];
    //     delete values.prefix;
    //     console.log(values);
    //     ownProps.updateInfo(values).then(({data}) => {
    //         console.log("----settings----");
    //         console.log(data);
    //     })
    // },
});


export const TrackerEditForm = withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));

export default TrackerEditForm;