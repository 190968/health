import UserHealthTable from '../components/UserHealthTable';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {HealthElementFragment} from "../components/fragments";
import { compose } from 'recompose';
import { ifModuleExists } from '../../../components/App/app-context';

export const GET_USER_HEALTH_QUERY = gql`
    query GET_USER_HEALTH ($userId: UID!, $isFamily: Boolean, $cursors: CursorInput) {
        patient (id: $userId) {
            id
            getHealthRecords (isFamily: $isFamily, cursors: $cursors) {
                totalCount
                edges {
                    ...HealthElement
                }
                pageInfo {
                    endCursor
                    startCursor
                }
            }
            
        }
    }
    ${HealthElementFragment}
`;

const withQuery = graphql(
    GET_USER_HEALTH_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.user.id,
                isFamily: ownProps.isFamily
            }
        }),
        props: ({data}) => {
            const {loading, patient={}, refetch} = data;
            const {getHealthRecords={}} = patient || {};
            const {edges=[], totalCount=0, pageInfo={}} = getHealthRecords || {};
            const {endCursor} = pageInfo || {};
            
            return {
                items: edges,
                total: totalCount,
                loading: loading,
                lastCursor: endCursor,
                refetch: refetch,
                changePage(lastCursor) {
                    return data.fetchMore({
                        variables: {
                            cursors: {after: lastCursor}
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }

                            return fetchMoreResult;
                            // return Object.assign({}, previousResult, {
                            //     // Append the new feed results to the old one
                            //     planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                            // });
                        },
                    });
                }
            }
        },
    }
);

const enhance = compose(
    ifModuleExists('health'),
    withQuery
);
export const DiagnosesList = enhance(UserHealthTable);
export default DiagnosesList;
