import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ScreeningPureFragment, ScreeningFragment, ScreeningPopulationFragment } from "./fragments";
import { PatientInfoFragment } from "../../../User/fragments";

const GET_SCREENINGS_QUERY = gql`    
    query GET_SCREENINGS ($search: String, $status: String, $cursors: CursorInput) {
        management {
            getScreenings (search: $search, status:$status, cursors: $cursors) {
                edges {
                    ...ScreeningPure
                    getPopulation {
                        totalCount
                    }
                }
                totalCount
            }
        }
    }
    ${ScreeningPureFragment}
`;

export const withScreeningsQuery = graphql(
    GET_SCREENINGS_QUERY,
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
            const {getScreenings} = data.management || {};
            const {edges=[], totalCount=0} = getScreenings || {};
            return {
                screenings: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
                refetchList: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                // loadByActivityStatus(activityStatus) {
                //     return data.refetch({
                //         activityStatus
                //     })
                // },
                loadByStatus(status) {
                    return data.refetch({
                        status
                    })
                },
                // loadMoreEntries(variables) {
                //     return data.fetchMore({
                //         // query: ... (you can specify a different query. FEED_QUERY is used by default)
                //         variables,
                //         updateQuery: (previousResult, {fetchMoreResult}) => {
                //             if (!fetchMoreResult) { return previousResult; }

                //             return fetchMoreResult;
                //             return Object.assign({}, previousResult, {
                //                 // Append the new feed results to the old one
                //                 planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                //             });
                //         },
                //     });
                // }
            }
        },
    }
);

 
const GET_SCREENING_QUERY = gql`    
    query GET_SCREENING ($id: UID!) {
        management {
            getScreening (id: $id) {
                ...Screening
            }
        }
    }
    ${ScreeningFragment}
`;

export const withScreeningQuery = graphql(
    GET_SCREENING_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.screening || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getScreening} = data.management || {};
            return {
                screening: getScreening,
                loading: data.loading,
            }
        },
    }
);



const GET_SCREENING_POPULATION_QUERY = gql`    
    query GET_SCREENING_POPULATION ($id: UID!, $search: String, $status: String, $cursors: CursorInput) {
        management {
            getScreening (id: $id) {
                id
                getPopulation (search: $search, status:$status, cursors: $cursors) {
                    totalCount
                    edges {
                        ...ScreeningPopulation
                    }
                }
            }
        }
    }
    ${PatientInfoFragment}
    ${ScreeningPopulationFragment}
`;

export const withScreeningPopulationQuery = graphql(
    GET_SCREENING_POPULATION_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.screening || {};
            return {
                variables: {
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getScreening} = data.management || {};
            const {getPopulation} = getScreening || {};
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
                    return data.refetch(variables);
                }
            }
        },
    }
);

 