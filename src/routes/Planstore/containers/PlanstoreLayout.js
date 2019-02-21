import PlanstoreLayout from '../components/PlanstoreLayout'
import Plan from '../../Plan/components/Plan';
import { compose, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ifPageExists } from '../../../components/App/app-context';
import { PlanCardFragment } from '../../Plan/components/Plan/fragments';

const PLANSTORE_DASH_QUERY = gql`
     query GET_PLANSTORE_DASH {#($filters: PlanstorePlanFilterInput, $page: Int, $limit: Int) {
        planstore {
            # plans (filters: $filters, page: $page, limit: $limit) {
            #     totalCount
            #     edges {
            #         ...PlanCardInfo
            #     }
            # }
            filters {
                code
                name
                fields {
                    type
                    label
                    value
                    range {
                        min
                        max
                    }
                    items {
                        label
                        value
                    }
                }
            }
        }
    }
`;

// 1- add queries:
const withQuery = graphql(
    PLANSTORE_DASH_QUERY,
    {
        options: (ownProps) => {
            const {page=1} = ownProps;
            return {
                variables: {
                    //filters: ownProps.activeFilters,
                    // page: page,
                    // limit: 20,
                },
                //fetchPolicy: 'network-only'
            };
        },
        props: ({ data }) => {

            if (!data.loading) {
                const { planstore } = data;
                const { filters, plans } = planstore || {};
                // const {planstore} = data;
                // const {plans} = planstore || {};
                // const { edges=[], totalCount=0, pageInfo} = plans || {};
                // const {endCursor} = pageInfo || {};
                return {
                    filters,
                    // plans:edges,
                    loading: data.loading,
                }
            } else {
                return { loading: data.loading }
            }
        },
    }
);


const enhance = compose(
    withQuery,
    withStateHandlers(props => {
        return {
            activeFilters: {},
            search: '',
        }
    }, {
            resetFilters: props => () => {
                console.log(111);
                return {
                    activeFilters: {},
                    search: ''
                }
            },
            updateFilters: state => (code, value) => {
                const {activeFilters} = state;
                // console.log(code);
                // console.log(value);
                const newFilter = {[code]:value};
                return {
                    activeFilters: {...activeFilters, ...newFilter}
                }
            },
            handleSearch: props => (search) => {
                return {search}
            }
        }),
)
export default ifPageExists('aps', 'planstore', false)(enhance(PlanstoreLayout));