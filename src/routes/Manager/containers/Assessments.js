import Assessments from '../components/Assessments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose} from 'recompose';
import { withTableCursors } from '../../../components/Tables/hocs';
const GET_ASSESSMENTS_QUERY = gql`    
query GET_ASSESSMENTS ($status: AssessmentStatusEnum, $cursors: CursorInput) {
    management {
        getAssessments (status: $status, cursors: $cursors) {
            totalCount
            edges {
                id
                name
                description
                isForm
                status
                isPatientReport
                getTotalAssigns
                createdDate
            }
        }
    }
}
`;

// 1- add queries:
const withQuery = graphql(
    GET_ASSESSMENTS_QUERY,
    {
        options: (ownProps) => {
            return {
                // variables: {
                //     status: null
                // },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {getAssessments} = data.management || {};
            const {status} = data.variables || {};
            const {edges=[], totalCount=0} = getAssessments || {};
            return {
                status,
                assessments: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
                loadByStatus(status) {
                    if (status === 'all') {
                        status = null;
                    }
                    return data.refetch({
                        status: status
                    });
                },
                loadMoreEntries(variables) {

                    return data.refetch(variables);
                    // return data.fetchMore({
                    //     // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    //     variables: {
                    //         // We are able to figure out which offset to use because it matches
                    //         // the feed length, but we could also use state, or the previous
                    //         // variables to calculate this (see the cursor example below)
                    //         page: ownProps.page+1,
                    //     },
                    //     updateQuery: (previousResult, {fetchMoreResult}) => {
                    //         if (!fetchMoreResult) { return previousResult; }

                    //         return fetchMoreResult;
                    //         return Object.assign({}, previousResult, {
                    //             // Append the new feed results to the old one
                    //             planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                    //         });
                    //     },
                    // });
                }
            }
        },
    }
);

const enhance = compose(
   withQuery,
   withTableCursors
);
export default enhance(Assessments);