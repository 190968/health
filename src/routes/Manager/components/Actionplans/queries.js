import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PlanFullFragment, PlanFragment } from "./fragments";
import { UserInfoFragment } from "../../../User/fragments";

const GET_ACTIONPLANS_QUERY = gql`    
    query GET_ACTIONPLANS ($search: String, $status: PlanStatusEnum,  $cursors: CursorInput) {
        management {
            getPlans (search: $search, cursors: $cursors, status: $status) {
                edges {
                    ...Plan
                    createdOn
                    createdBy {
                        ...UserInfo
                    }
                    status
                }
                totalCount
            }
        }
    }
    ${ PlanFragment }
    ${UserInfoFragment}
`;

export const withActionplansQuery = graphql(
    GET_ACTIONPLANS_QUERY,
    {
        options: (ownProps) => {
            const {filters} = ownProps || {};
            return {
                variables: {
                    filters
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getPlans} = data.management || {};
            const {edges=[], totalCount=0} = getPlans || {};
            const {variables} = data;
            const {status} = variables || {};
            return {
                plans: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
                status,
                refetchList: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                loadByStatus(status) {
                    if (status === 'all') {
                        return data.refetch({
                            status:null
                        });
                    }
                    return data.refetch({
                        status
                    })
                },
                loadMoreEntries(variables) {
                    return data.refetch(variables);
                }
            }
        },
    }
);

 
const GET_ACTIONPLAN_QUERY = gql`    
    query GET_ACTIONPLANS ($id: UID!) {
        management {
            getPlan (id: $id) {
                ...PlanFull
            }
        }
    }
    ${ PlanFullFragment }
`;

export const withActionplanQuery = graphql(
    GET_ACTIONPLAN_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.plan || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const { plan } = ownProps;
            const {loading, management} = data;
            const { getPlan=plan } = management || {};
            return {
                plan: getPlan,
                loading: data.loading,
            }
        },
    }
);