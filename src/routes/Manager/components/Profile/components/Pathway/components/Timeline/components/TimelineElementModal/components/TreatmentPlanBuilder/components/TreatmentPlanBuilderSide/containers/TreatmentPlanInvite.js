import TreatmentPlanInvite from '../components/TreatmentPlanInvite';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { TreatmentPlanFragment } from '../../../fragments';
import { GET_TIMELINE_QUERY } from '../../../../../../../../../containers/Timeline';
//import {TumorboardFragment} from "../../../../../../Tumorboard/containers/TumorboardManager";
//import {UserInfoFragment} from "../../../../../../../../User/fragments";
//
// const GET_PATIENT_TUMORBOARD_QUERY  = gql`
//     query GET_PATIENT_TUMORBOARD ($userId: UID!) {
//         getPatientTumorboard (userId:$userId) {
//             ...TumorboardInfo
//             participants {
//                 ...UserInfo
//             }
//         }
//     }
//     ${TumorboardFragment}
//     ${UserInfoFragment}
// `;
//
// const withQuery = graphql(GET_PATIENT_TUMORBOARD_QUERY, {
//     options: (ownProps) => {
//         return {
//             variables: {
//                 userId: ownProps.userId,
//             },
//         }
//     },
//     props: ({ ownProps, data }) => {
//         const {tumorboard} = ownProps;
//         const {getPatientTumorboard=tumorboard} = data;
//         return {loading: data.loading, tumorboard:getPatientTumorboard};
//     },
// });
//
const TUMORBOARD_PUBLISH_MUTATION = gql`
    mutation TreatmentPlanPublish($id: UID!,   $participants:[UID],   $message: String){
        treatmentPlanInvite(id:$id,  participants:$participants,   message:$message) {
            ...TreatmentPlanInfo
        }
    }
    ${TreatmentPlanFragment}
`;


const withMutation = graphql(TUMORBOARD_PUBLISH_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onSubmit: (id, participants) => {
            return mutate({
                variables: {id: id, ...participants},
                refetchQueries: [{
                    query: GET_TIMELINE_QUERY,
                    variables: { userId: ownProps.user.id},
                }],
            });
        },
    }),
});
//
 //const withQueryMutation = compose(withQuery, withMutation);

export default withMutation(TreatmentPlanInvite);
