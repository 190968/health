import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PatientInfoFragment } from "../../../User/fragments";
import { preparePatientFiltersInput } from "../../../../components/Tables/FilterFields";

const GET_PATIENTS_QUERY = gql`    
    query GET_PATIENTS ($search: String,  $filters:PatientFiltersInput,  $status: UserRoleStatusEnum, $cursors: CursorInput) {
        management {
            getPatients (search: $search, status:$status, cursors: $cursors, filters: $filters) {
                edges {
                    ...PatientInfo
                    getInfoByNetworkTable {
                        code
                        value
                    }
                }
                totalCount
            }
        }
  }
  ${PatientInfoFragment}
  
`;

export const withPatientsQuery = graphql(
    GET_PATIENTS_QUERY,
    {
        options: (ownProps) => {
            const {activeFilters} = ownProps || {};
            return {
                variables: {
                    filters:activeFilters
                },
                // fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getPatients} = data.management || {};
            const {edges=[], totalCount=0} = getPatients || {};
            return {
                patients: edges,
                total: totalCount,
                loading: data.loading,
                refetchList: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                loadMoreEntries(variables) {
                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables,
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }

                            return fetchMoreResult;
                            return Object.assign({}, previousResult, {
                                // Append the new feed results to the old one
                                planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                            });
                        },
                    });
                }
            }
        },
    }
);

const GET_PATIENTS_SIMPLE_QUERY = gql`    
    query GET_PATIENTS_SIMPLE ($search: String, $filters:PatientFiltersInput, $status: UserRoleStatusEnum, $cursors: CursorInput) {
        management {
            getPatients (search: $search, status:$status, cursors: $cursors, filters: $filters) {
                edges {
                    ...PatientInfo
                }
                totalCount
            }
        }
  }
  ${PatientInfoFragment}
`;

export const withPatientsSimpleQuery = graphql(
    GET_PATIENTS_SIMPLE_QUERY,
    {
        options: (ownProps) => {
            const {activeFilters} = ownProps || {};
            // console.log(ownProps, 'ownProps');
            // console.log(activeFilters);
            return {
                variables: {
                    filters: preparePatientFiltersInput(activeFilters)
                },
                // fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getPatients} = data.management || {};
            const {edges=[], totalCount=0} = getPatients || {};
            return {
                patients: edges,
                total: totalCount,
                loading: data.loading,
                refetchList: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search
                    })
                },
                loadMoreEntries(variables) {
                    return data.refetch(variables);
                }
            }
        },
    }
);

 