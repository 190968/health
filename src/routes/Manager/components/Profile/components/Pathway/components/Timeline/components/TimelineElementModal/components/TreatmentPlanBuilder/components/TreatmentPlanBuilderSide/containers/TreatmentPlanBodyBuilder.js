import TreatmentPlanBodyBuilderPure from '../components/TreatmentPlanBodyBuilder';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


const GET_TREATMENT_PLAN_QUERY  = gql`
    query GET_TREATMENT_PLAN ($id: UID!) {
        getTreatmentPlan (id:$id) {
            id
            title
        }
    }
`;

const withQuery = graphql(GET_TREATMENT_PLAN_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                id: ownProps.id,
            },
        }
    },
    props: ({ ownProps, data }) => {
        const {treatmentPlan={}} = ownProps;
        const {getTreatmentPlan=treatmentPlan} = data;
        return {loading: data.loading, treatmentPlan:getTreatmentPlan};
    },
});


export const TreatmentPlanBodyBuilder = withQuery(TreatmentPlanBodyBuilderPure);
export default TreatmentPlanBodyBuilder;
