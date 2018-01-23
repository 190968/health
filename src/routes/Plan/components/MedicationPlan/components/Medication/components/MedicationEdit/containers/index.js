/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import MedicationEditForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { message } from 'antd';
import {MedicationPlan} from "../../../../../containers";

//import { compose } from 'react-apollo';

const medication = gql`
query GET_MEDICATION($user_id: ID!, $id: ID) {
            medication(id: $id, userId: $user_id) {
                id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug {
                  id
                  name
                  dosage
                },
                quantity
            }
}
`;
const editMutation=gql`
 mutation MedicationUpdate($id: ID!, $userId: ID!, $input: MedicationInput!) {
        medicationUpdate(id:$id, userId: $userId, input: $input) {
             id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug {
                  id
                  name
                  dosage
                },
                quantity
        }
    }
`;
const addMutation=gql`
 mutation MedicationAdd($userId: ID!, $input: MedicationInput!) {
        medicationAdd(userId: $userId, input: $input) {
             id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
                },
                type,
                drug {
                  id
                  name
                  dosage
                },
                quantity
        }
    }
`;

const MedicationEditWithQuery = graphql(medication,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return   {
            variables: {
                user_id: ownProps.userId,
                id: ownProps.id,

            },
                fetchPolicy: 'network-only'
        }},
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.medication,
                    loading: data.loading
                }
            }
             else {
                return {loading: data.loading}
            }
        },
    }
)(MedicationEditForm);

const withMutation = graphql(editMutation, {
    props: ({ mutate }) => ({
        updateMedication: (id, uid, input, date, onCancel) => {
            console.log("editMutation--------------------> ",id);
            console.log(input);
            return mutate({
                variables: {id:id, userId:uid, input: {details:input}},
                /*refetchQueries: [{
                    query: editMutation,
                    variables: {
                        id: id,
                        user_id: uid
                    },
                }],*/
                update: (store, { data: { medicationUpdate } }) => {

                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: medication,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });
                    if (id) {
                        // add new to the list
                    }

                   // console.log(data);
                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    store.writeQuery({
                        query: medication,
                        data: {medication: medicationUpdate},
                        variables: {
                            id: id,
                            user_id: uid
                        }});
                },
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })},
    }),
});


export const MedicationAddForm = graphql(addMutation, {
    props: ({ mutate }) => ({
        updateMedication: (id, uid, input, date, onCancel) => {
            console.log("addMUtation--------------------> ",id);
            return mutate({
                variables: {userId:uid, input: {details:input}},
                refetchQueries: [{
                    query: MedicationPlan,
                    variables: { user_id: uid, date:date },
                }],
            }).then((data) => {
                onCancel(data);
                message.success('Saved');
            })},
    }),
})(MedicationEditWithQuery);

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



export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationEditWithQuery));
