import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withSpinnerWhileLoading, withModalSpinnerWhileLoading } from '../../../Modal';
import {compose, branch} from 'recompose';
import { withDischargePlanQuery } from './queries';

const CREATE_DISCHARGE_PLAN_MUTATION = gql`
    mutation CREATE_DISCHARGE_PLAN($patientId: UID!,$isDraft: Boolean, $input: DischargePlanInput!) {
        createDischargePlan(patientId: $patientId, isDraft: $isDraft, input: $input) {
            plan {id}
        }
    }
`;
const UPDATE_DISCHARGE_PLAN_MUTATION = gql`
    mutation UPDATE_DISCHARGE_PLAN($id: UID!,$isDraft: Boolean, $input: DischargePlanInput!) {
        updateDischargePlan(id: $id, isDraft: $isDraft, input: $input) {
            plan {id}
        }
    }
`;

const withCreateDischargePlanMutation = graphql(CREATE_DISCHARGE_PLAN_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createDischargePlan: (input, isDraft) => {
            const {user} = ownProps;
            const {id: userId} = user || {};
            return mutate({variables: { patientId: userId, input, isDraft }});
        },
    }),
});

const withUpdateDischargePlanMutation = graphql(UPDATE_DISCHARGE_PLAN_MUTATION, {
    props: ({ownProps:{dischargePlan}, mutate }) => ({
        updateDischargePlan: (input, isDraft) => {
            return mutate({variables: { id: dischargePlan.id, isDraft, input}});
        },
    }),
});

const withUpdateDischargePlanMutationQuery = compose(
    withDischargePlanQuery,
    withModalSpinnerWhileLoading,
    withUpdateDischargePlanMutation
);
export const withCreateOrUpdateDischargePlan = branch(props => props.dischargePlan, withUpdateDischargePlanMutationQuery, withCreateDischargePlanMutation);
