import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { branch, compose } from 'recompose';
import { USER_PLANS_LIST_QUERY } from '../../routes/Plan/containers/PlansList';
import { GET_USER_ASSESSMENTS_QUERY } from '../../routes/Manager/components/Profile/containers/Assessments';

export const ASSIGN_TO_PATIENT_MUTATION = gql`
    mutation ASSIGN_TO_PATIENT($id: UID!, $input:[TaskAttachmentInput]!) {
        assignToPatient(userId:$id, input: $input)
    }
`;
export const withAssignToPatientMutation = graphql(ASSIGN_TO_PATIENT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        assignToPatient: (input) => {
            let refetchQueries = [];
            input.map(attachment => {
                const {type} = attachment;
                switch(type) {
                    case 'ap':
                        // if it's app, refresh a list of plans
                        refetchQueries.push({
                            query: USER_PLANS_LIST_QUERY,
                            variables: {user_id: ownProps.patient.id}
                        });
                        break;
                    case 'assessment':
                        refetchQueries.push({
                            query: GET_USER_ASSESSMENTS_QUERY,
                            variables: {user_id: ownProps.patient.id}
                        });
                        break;
                }
                return null;
            })
            return mutate({
                variables: { id: ownProps.patient.id, input: input },
                refetchQueries
            })
        },
    }),
});
 

