
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
// import { withTransitionQuery, TransitionInfoFragment } from './queries';
// import {compose} from 'recompose';


// const TRANSITION_UPDATE_MUTATION = gql`
//     mutation TRANSITION_UPDATE($id: UID!, $input:UserTransitionInput!){
//         updateTransition(id:$id, input:$input) {
//             ...TransitionInfo
//         }
//     }
//     ${TransitionInfoFragment}
// `;


// const withMutationEdit = graphql(TRANSITION_UPDATE_MUTATION, {
//     props: ({ownProps:{transition}, mutate }) => ({
//         onSubmit: (input) => {
//             return mutate({variables: { id: transition.id, input: input}});
//         },
//     }),
// });
// export const withUpdateTransitionMutation = compose(withTransitionQuery, withMutationEdit);


// const CREATE_TRANSITION_MUTATION = gql`
//     mutation createTransition($userId: UID!,$input:UserTransitionInput!){
//         createTransition(userId:$userId, input:$input) {
//             ...TransitionInfo
//         }
//     }
//     ${TransitionInfoFragment}
// `;

// export const withCreateTransitionMutation = graphql(CREATE_TRANSITION_MUTATION, {
//     props: ({mutate, ownProps}) => {
//         return {
//             onSubmit: (input) => {
//                 const {user={}} = ownProps;
//                 return mutate({
//                     variables: {input, userId:user.id},
//                 });
//             },
//         }
//     }
// });

const REPORT_QUALITY_MEASURE_MUTATION = gql`
    mutation reportQualityMeasure($userId: UID!, $id: UID!, $input:[QualityMeasurementReportInput]!){
        reportQualityMeasure(userId:$userId, id:$id, input:$input) {
            id
        }
    }
`;

export const withReportQualityMeasuresMutation = graphql(REPORT_QUALITY_MEASURE_MUTATION, {
    props: ({mutate, ownProps}) => {
        return {
            reportQM: (input) => {
                const {user, qm} = ownProps;
                return mutate({
                    variables: {input, id:qm.id, userId:user.id},
                });
            },
        }
    }
});


const DELETE_QM_MUTATION = gql`
    mutation DELETE_QM($id: UID!, $userId:UID!){
        deletePatientQualityMeasure(id:$id, userId:$userId)
    }
`;


export const withDeleteQmMutation = graphql(DELETE_QM_MUTATION, {
    props: ({ownProps:{qm, user}, mutate }) => ({
        deleteQM: () => {
            return mutate({variables: { id: qm.id, userId: user.id}});
        },
    }),
});
