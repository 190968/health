import ChangeRole from '../components/ChangeRole';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_CURRENT_ROLE_QUERY} from "../../../../../index";

const ChangeRole_Mutation = gql`
 mutation ChangeRole($role: RoleEnum!) {
       
        changeRole(role: $role) {
                currentRole
        }
    }
`;


const withMutation = graphql(ChangeRole_Mutation, {
    props: ({mutate}) => ({
        changeRole: (role) => {
            return mutate({
                variables: {role:role},

                update: (store, { data: { changeRole: {currentRole} } }) => {
                    //console.log(trackerUpdate);
                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: GET_CURRENT_ROLE_QUERY,
                    });

                    //console.log(data);
                    const newData = {...data, ...{account: {...data.accelerator, ...{currentRole:currentRole}}}};

                    store.writeQuery({
                        query: GET_CURRENT_ROLE_QUERY,
                        data: newData
                    });


                    //if (id) {
                        // add new to the list
                    //}
/*
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
                                user_id: ownProps.userId
                            }
                        });
                    } else {
                        store.writeQuery({
                            query: tracker,
                            data: {tracker: trackerUpdate},
                            variables: {
                                id: id,
                                user_id: ownProps.userId
                            }
                        });
                        //console.log(trackerUpdate, 'need to append');
                    }*/
                },

                //refetchQueries: ['GET_CURRENT_ROLE'/*{
                    //query: GET_CURRENT_ROLE_QUERY,
                    //variables: {user_id: uid, date: date},
               // }*/],
            })
        },
    }),
});


export default withMutation(ChangeRole);