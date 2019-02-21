import TreatmentPlanBodyBuilderPure from '../components/TreatmentPlanBodyBuilder';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {TreatmentPlanFullFragment} from '../../../fragments';
//
// const GET_TREATMENT_PLAN_QUERY  = gql`
//     query GET_TREATMENT_PLAN ($id: UID!) {
//         getTreatmentPlan (id:$id) {
//             id
//             title
//         }
//     }
// `;
//
// const withQuery = graphql(GET_TREATMENT_PLAN_QUERY, {
//     options: (ownProps) => {
//         return {
//             variables: {
//                 id: ownProps.id,
//             },
//         }
//     },
//     props: ({ ownProps, data }) => {
//         const {treatmentPlan={}} = ownProps;
//         const {getTreatmentPlan=treatmentPlan} = data;
//         return {loading: data.loading, treatmentPlan:getTreatmentPlan};
//     },
// });


// update ELEMENTs
const UPDATE_TREATMENT_PLAN_ELEMENTS_MUTATION = gql`
    mutation UpdateTreatmentPlanElements($id: UID!,  $elements:[TreatmentPlanElementInput]!){
        updateTreatmentPlanElements(id:$id, elements:$elements) {
            ...TreatmentPlanFullInfo
        }
    }
    ${TreatmentPlanFullFragment}
`;


export const withUpdateTreatmentPlanElementsMutation = graphql(UPDATE_TREATMENT_PLAN_ELEMENTS_MUTATION, {
    props: ({ownProps, mutate }) => ({
        submitElements: (elements) => {
            return mutate({
                variables: {id: ownProps.treatmentPlan.id, elements},
                // refetchQueries: [{
                //     query: GET_TUMORBOARD_QUERY,
                //     variables: {id:ownProps.tumorboard.id},
                // }],
            });
        },
    }),
});


export const TreatmentPlanBodyBuilder = withUpdateTreatmentPlanElementsMutation(TreatmentPlanBodyBuilderPure);
export default TreatmentPlanBodyBuilder;
