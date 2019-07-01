import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch} from 'recompose';
import { withPatientDmeReferralQuery, GET_PATIENT_DME_REFERRALS_QUERY } from './queries';
import { DmeReferralFragment } from './fragments';
import { withModalSpinnerWhileLoading } from '../Modal';

const CREATE_DME_REFERRAL_MUTATION = gql`
    mutation CREATE_DME_REFERRAL($patientId: UID!, $isDraft: Boolean, $input: DmeReferralInput!) {
        createDmeReferral(patientId: $patientId, isDraft: $isDraft, input: $input) {
            patient (id: $patientId) {
                id
            }
        }
    }
`;
const UPDATE_DME_REFERRAL_MUTATION = gql`
    mutation UPDATE_DME_REFERRAL($id: UID!, $isDraft: Boolean, $input: DmeReferralInput!) {
        updateDmeReferral(id: $id, isDraft: $isDraft, input: $input) {
            dmeReferral {
                ...DmeReferral
            }
        }
    }
    ${DmeReferralFragment}
`;

const withCreateDmeReferralMutation = graphql(CREATE_DME_REFERRAL_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createDmeReferral: (input, isDraft) => {
            const {user} = ownProps;
            const {id: userId} = user || {};
            return mutate({variables: { patientId: userId, input, isDraft },
                refetchQueries: [{
                    query: GET_PATIENT_DME_REFERRALS_QUERY,
                    variables: {userId},
                }],
            });
        },
    }),
});

const withUpdateDmeReferralMutation = graphql(UPDATE_DME_REFERRAL_MUTATION, {
    props: ({ownProps:{dmeReferral}, mutate }) => ({
        updateDmeReferral: (input, isDraft) => {
            return mutate({variables: { id: dmeReferral.id, isDraft, input}});
        },
    }),
});

const withUpdateDmeReferralMutationQuery = compose(
    withPatientDmeReferralQuery,
    withModalSpinnerWhileLoading,
    withUpdateDmeReferralMutation
);
export const withCreateOrUpdateDmeReferral = branch(props => props.dmeReferral, withUpdateDmeReferralMutationQuery, withCreateDmeReferralMutation);



const DELETE_DME_REFERRAL_MUTATION = gql`
    mutation DELETE_DME_REFERRAL($id: UID!) {
        deleteDmeReferral(id: $id)
    }
`;
 
export const withDmeReferralMutation = graphql(DELETE_DME_REFERRAL_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        deleteDmeReferral: () => {
            const  {dmeReferral} = ownProps;
            const {id} = dmeReferral || {};
            return mutate({
                variables: {id},
            });
        },
    }),
});
