import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CampaignPureFragment, CampaignFragment, CampaignPopulationFragment } from "./fragments";
import { PatientInfoFragment } from "../../../User/fragments";

const GET_CAMPAIGNS_QUERY = gql`    
    query GET_CAMPAIGNS ($search: String,  $cursors: CursorInput) {
        management {
            getCampaigns (search: $search, cursors: $cursors) {
                edges {
                    ...CampaignPure
                    getPopulation {
                        totalCount
                    }
                }
                totalCount
            }
        }
    }
    ${ CampaignPureFragment }
`;

export const withCampaignsQuery = graphql(
    GET_CAMPAIGNS_QUERY,
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
            const {getCampaigns} = data.management || {};
            const {edges=[], totalCount=0} = getCampaigns || {};
            return {
                campaigns: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
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
            }
        },
    }
);

 
const GET_CAMPAIGN_QUERY = gql`    
    query GET_CAMPAIGN ($id: UID!) {
        management {
            getCampaign (id: $id) {
                ...Campaign
                getPopulation {
                    totalCount
                }
                progress
            }
        }
    }
    ${ CampaignFragment }
`;

export const withCampaignQuery = graphql(
    GET_CAMPAIGN_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.campaign || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {campaign} = ownProps;
            const {management, loading} = data;
            const { getCampaign=campaign } = management || {};
            return {
                campaign: getCampaign,
                loading: data.loading,
            }
        },
    }
);




const GET_CAMPAIGN_POPULATION_QUERY = gql`    
    query GET_CAMPAIGN_POPULATION ($id: UID!, $search: String, $status: String, $cursors: CursorInput) {
        management {
            getCampaign (id: $id) {
                id
                getPopulation (search: $search, status:$status, cursors: $cursors) {
                    totalCount
                    edges {
                        ...CampaignPopulation
                    }
                }
            }
        }
    }
    ${PatientInfoFragment}
    ${CampaignPopulationFragment}
`;

export const withCampaignPopulationQuery = graphql(
    GET_CAMPAIGN_POPULATION_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.campaign || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getCampaign} = data.management || {};
            const {getPopulation} = getCampaign || {};
            const {edges, totalCount} = getPopulation || {};
            const {variables} = data;
            const {status} = variables || {};

            return {
                population: edges,
                total: totalCount,
                loading: data.loading,
                status,
                refetch: data.refetch,
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
                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables,
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }

                            const {getCampaign} = previousResult.management || {};
                            const {getPopulation} = getCampaign || {};
                            const {edges} = getPopulation || {};
                            //
                            const {getCampaign:getCampaignNew} = fetchMoreResult.management || {};
                            const {getPopulation:getPopulationNew} = getCampaignNew || {};
                            const {edges:edgesNew} = getPopulationNew || {};
                            
                            // return {management: management }
                            // console.log(previousResult);
                            // console.log(fetchMoreResult);
                            return fetchMoreResult;
                            return Object.assign({}, previousResult, {
                                // Append the new feed results to the old one
                                planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                            });
                        },
                    });
                }
                // loadMoreEntries(variables) {
                //     return data.refetch(variables);
                // }
            }
        },
    }
);

 