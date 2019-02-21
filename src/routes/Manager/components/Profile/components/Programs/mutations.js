import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NETWORK_PROGRAM_QUERY, GET_PATIENT_PROGRAMS_QUERY } from './queries';
// Add
export const PROGRAM_JOIN_MUTATION = gql`
    mutation joinNetworkProgram($id: UID!, $userId:UID!, $unjoin: Boolean) {
        joinNetworkProgram(id: $id, userId:$userId, unjoin:$unjoin) {
           id
           isApproved
        }
    }
`;
 
export const withProgramJoinMutation = graphql(PROGRAM_JOIN_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        joinProgram: () => {
            const {program, patient} = ownProps;
            const {id:userId} = patient || {};
            return mutate({
                variables: {id:program.id, userId},
                update: (store, { data: { joinNetworkProgram } }) => {

                    const variables =  {
                        id:program.id,
                        userId
                    };
                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: NETWORK_PROGRAM_QUERY,
                        variables
                    });
                    const {management} = data || {};
                    const {getProgram} = management || {};
                    // console.log(management);
                    // console.log(getProgram);
                    // console.log(joinNetworkProgram);
                    // console.log({...management, getProgram: {...getProgram, getPatientReferral: joinNetworkProgram}});
                    // console.log({management: {...management, getProgram: {...getProgram, getPatientReferral: joinNetworkProgram}}});


                    // const newData = {...data, ...{account: {...data.account, ...{currentRole:currentRole}}}};

                    store.writeQuery({
                        query: NETWORK_PROGRAM_QUERY,
                        data: {management: {...management, getProgram: {...getProgram, getPatientReferral: joinNetworkProgram}}},
                        variables
                    });
 
 
                },
                refetchQueries: [{
                    query: GET_PATIENT_PROGRAMS_QUERY,
                    variables: {userId},
                }],
                //
               
            })
        },
        unjoinProgram: () => {
            const {program, patient} = ownProps;
            const {id:userId} = patient || {};
            return mutate({
                variables: {id:program.id, userId, unjoin:true},
                update: (store, {}) => {

                    const variables =  {
                        id:program.id,
                        userId
                    };
                    // Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: NETWORK_PROGRAM_QUERY,
                        variables
                    });
                    const {management} = data || {};
                    const {getProgram} = management || {};
                    // console.log(management);
                    // console.log(getProgram);
                    // console.log({management: {...management, getProgram: {...getProgram, getPatientReferral: null}}});


                    store.writeQuery({
                        query: NETWORK_PROGRAM_QUERY,
                        data: {management: {...management, getProgram: {...getProgram, getPatientReferral: null}}},
                        variables
                    });
 
 
                },
                refetchQueries: [{
                    query: GET_PATIENT_PROGRAMS_QUERY,
                    variables: {userId},
                }],
            })
        },
        
    }),
});
