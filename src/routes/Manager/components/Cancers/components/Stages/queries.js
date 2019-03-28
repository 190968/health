import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CancerStageFullFragment, CancerStageManageFragment, CancerStageFragment } from "./fragments";

const GET_CANCER_STAGES_QUERY = gql`    
    query GET_CANCER_STAGES ($search: String,  $cursors: CursorInput) {
        health {
            getCancerStages (search: $search, cursors: $cursors) {
                edges {
                    ...CancerStage
                }
                totalCount
            }
        }
    }
    ${ CancerStageFragment }
`;

export const withCancerStagesQuery = graphql(
    GET_CANCER_STAGES_QUERY,
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
            const {variables} = data;
            const {getCancerStages} = data.health || {};
            const {edges=[], totalCount=0} = getCancerStages || {};
            const {status} = variables || {};
            return {
                cancerStages: edges,
                total: totalCount,
                loading: data.loading,
                status: status,
                refetch: data.refetch,
                refetchList: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                loadByStatus(status) {
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

 
const GET_CANCER_STAGE_QUERY = gql`    
    query GET_CANCER_STAGE ($id: UID!) {
        health {
            getCancerStage (id: $id) {
                ...CancerStageFull
            }
        }
    }
    ${ CancerStageFullFragment }
`;

const GET_CANCER_STAGE_MANAGE_QUERY = gql`    
    query GET_CANCER_STAGE_MANAGE ($id: UID!) {
        health {
            getCancerStage (id: $id) {
                ...CancerStageManage
            }
        }
    }
    ${ CancerStageManageFragment }
`;


const singleQueryDefaultOpts = {
    options: (ownProps) => {
        const {id} = ownProps.cancerStage || {};
        return {
            variables: {
                id
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ ownProps, data }) => {
        const { cancerStage } = ownProps;
        const {loading, health} = data;
        const { getCancerStage=cancerStage } = health || {};
        return {
            cancerStage: getCancerStage,
            loading: data.loading,
        }
    },
};

export const withCancerStageQuery = graphql(
    GET_CANCER_STAGE_QUERY, singleQueryDefaultOpts
);

export const withCancerStageManageQuery = graphql(
    GET_CANCER_STAGE_MANAGE_QUERY, singleQueryDefaultOpts
);