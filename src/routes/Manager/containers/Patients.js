import Patients from '../components/Patients';
import { graphql } from 'react-apollo';
import queryString from 'query-string';
import gql from 'graphql-tag';
import { compose, withStateHandlers } from 'recompose';
import { PatientInfoFragment } from '../../User/fragments';
import { preparePatientFiltersInput } from '../../../components/Tables/FilterFields';
export const GET_PATIENTS_QUERY = gql`    
query GET_PATIENTS ($search: String, $status: UserRoleStatusEnum, $filters: PatientFiltersInput, $cursors: CursorInput) {
    management {
      getPatients (search: $search, status:$status, cursors: $cursors, filters:$filters) {
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

const withQuery = graphql(
    GET_PATIENTS_QUERY,
    {
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                // fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            //console.log(data);
            const { getPatients } = data.management || {};
            const { edges = [], totalCount = 0 } = getPatients || {};

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
                updateFilter(filters) {
                    return data.refetch({
                        filters

                    })
                },
                loadMoreEntries(variables) {

                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables,
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult) { return previousResult; }

                            return fetchMoreResult;
                            return Object.assign({}, previousResult, {
                                // Append the new feed results to the old one
                                planstore: { plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans] },
                            });
                        },
                    });
                }
            }
        },
    }
);

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => {
            const {location} = props;
            const {search} = location || {};
            var parsedUrl = queryString.parse(search);
            const {show_filters} = parsedUrl || {};
            let showFilters = show_filters === '1';
            return {
                showFilters: showFilters,
                activeFilters: {},
                showButton: false,
                selectedCount: 0,
                searchText: '',
            };
        },
        {


            toggleFilters: ({ showFilters }) => () => ({
                showFilters: !showFilters
            }),
            updateFilters: (state, props) => (newFilter) => {
                const { activeFilters } = state;
                // console.log(newFilter, 'newFilter');
                const filters = { ...activeFilters, ...newFilter };
                const inputFilters = preparePatientFiltersInput(filters);
                props.updateFilter(inputFilters);
                return { activeFilters: filters };
            },
            resetActiveFilters: () => () => {
                return {
                    activeFilters: {}
                }
            },



            // return {
            //         activeFilters: {}
            //     }
            // }, {
            //     





            openShowButton: ({ counter }) => (value) => (console.log(value), {
                showButton: true,
                selectedCount: value.length,
                selectedObj: value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),





            emitEmpty: ({ searchText }, props) => (value) => (
                {
                    searchText: '',
                    patients: props.patients
                }),
            sliderChange: ({ searchText }, props) => (value) => (
                {
                    patients: props.patients.map((record) => {
                        return {
                            ...record,
                            age: (
                                (record.age > value[0] && record.age < value[1]) ? record.age : null

                            ),
                        };
                    }).filter((data) => {
                        return data.age != null
                    })
                })

        })

);
export default enhance(Patients);