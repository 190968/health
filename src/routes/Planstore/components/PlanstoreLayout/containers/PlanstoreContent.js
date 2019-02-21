import PlanstoreContentPure, { PLANSTORE_TOUR_STEPS } from '../components/PlanstoreContent';
import { graphql } from 'react-apollo';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import gql from 'graphql-tag';
import { PlanCardFragment } from '../../../../Plan/components/Plan/fragments';
import { compose, withHandlers, withProps } from 'recompose';
import { withLoadingButton } from '../../../../../components/Loading';
import { withSpinnerWhileLoading } from '../../../../../components/Modal';

const GET_PLANSTORE_PLANS_QUERY = gql`
     query GET_PLANSTORE_PLANS ($filters: PlanstorePlanFilterInput, $page: Int, $limit: Int, $cursors: CursorInput, $search: String) {
        planstore {
            plans (filters: $filters, page: $page, limit: $limit, search: $search, cursors: $cursors) {
                totalCount
                edges {
                    ...PlanCardInfo
                    benefits
                    ribbon
                }
                pageInfo {
                    endCursor
                }
            }
        }
    }
    ${PlanCardFragment}
`;


// 1- add queries:
const withQuery = graphql(
    GET_PLANSTORE_PLANS_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                filters: ownProps.activeFilters,
                //page: ownProps.page,
                //limit: PLANS_PER_PAGE,
                search: ownProps.search,
            },
            fetchPolicy: 'network-only'
        }),
        props: ({ ownProps, data }) => {
                //console.log(data, 'datadatadata');
                const {planstore} = data;
                const {plans} = planstore || {};
                const { edges=[], totalCount=0, pageInfo} = plans || {};
                const {endCursor} = pageInfo || {};
                console.log(edges, 'edges');
                return {

                    plans: edges,
                    total: totalCount,
                    hasMore: edges.length < totalCount,
                    loading: data.loading,

                    loadMore(page) {
                        ownProps.setLoadingButton(true);
                        return data.fetchMore({
                            variables: {
                                page: page,
                                cursors: {before: endCursor}
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {

                                ownProps.setLoadingButton(false);
                                //callback();
                                if (!fetchMoreResult) { return previousResult; }

                                const newMessages = [...previousResult.planstore.plans.edges, ...fetchMoreResult.planstore.plans.edges]

                                return {...previousResult, planstore: {
                                    ...previousResult.planstore, plans: {
                                        ...previousResult.planstore.plans,
                                        edges: newMessages
                                    }
                                }}
                            },
                        });
                    }
                }
        },
    }
);

const enhance = compose(
    withLoadingButton,
    withSpinnerWhileLoading,
    withQuery,
    withRouter,
    withProps(props => {
        const {location} = props;
        const {search} = location || {};
        var parsedUrl = queryString.parse(search);
        const {tour} = parsedUrl || {};
        return {
            showTour: tour === '1'
        }

    }),
    withHandlers({
        handleInfiniteOnLoad: props => (page) => {
            props.loadMore(page);
        },
        handleTourCallback: ownProps => (props) => {
            const {action, index} = props;
            const { history} = ownProps;
            if (action === 'update') {
              const step = PLANSTORE_TOUR_STEPS [index] || null;
              console.log(step);
              const {url} = step || {};
              if (url) {
                history.push(url);
              }
            }
        }
    })
);
export const PlanstoreContent = enhance(PlanstoreContentPure);