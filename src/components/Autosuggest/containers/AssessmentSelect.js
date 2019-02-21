import AssessmentSelectPure from '../components/AssessmentSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_ASSESSMENTS_QUERY = gql`
    query GET_ASSESSMENTS_LIST ($search: String, $userId:UID, $cohortId: UID)  {
        management {
            getAssessments (search: $search, userId:$userId, cohortId: $cohortId) {
                edges {
                    id
                    name
                }
            }
        }
    }
`;

const withQuery = graphql(GET_ASSESSMENTS_QUERY,
    {
        options: (ownProps) => {
            const {cohort, patient} = ownProps;
            const {id:cohortId} = cohort || {};
            const {id:userId} = patient || {};
            return {
                fetchPolicy: 'network-only',
                variables: {
                    // userId:userId,
                    cohortId:cohortId,
                }
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                const {edges=[]} = data.management.getAssessments || {};
                return {
                    items: edges,
                    loading: data.loading,

                    doSearch(search) {
                        return data.refetch({
                            search: search
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
);

export const AssessmentSelect = withQuery(AssessmentSelectPure);
export default AssessmentSelect;