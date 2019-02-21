import Actionplans from '../components/Actionplans';
import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { PlanCardFragment } from '../../Plan/components/Plan/fragments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withTableCursors } from '../../../components/Tables/hocs';

const GET_ACTIONPLANS_QUERY = gql`    
    query GET_PLANSTORE_ACTIONPLANS ( $search: String, $status: String, $cursors: CursorInput, type:PlanTypeEnum) {
            managment {
                getPlans (search: $search, status:$status, cursors:$cursors, type:$type) {
                    totalCount
                    edges {
                        ...PlanCardInfo
                    }
                }
            }
    }
    ${PlanCardFragment}
`;

const withPlansQuery = graphql(
    GET_ACTIONPLANS_QUERY,
    {
        options: (ownProps) => {
            return {
                variables: {
                    type: 'ap',
                    status: 'active'
                },
                // fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {

            const {getPlans} = data.managment || {};
            const {totalCount, edges} = getPlans || {};

            return {
                plans: edges,
                total: totalCount,
                refetch: data.refetch,
                loading: data.loading,
                loadByStatus(status) {
                    return data.refetch({status});
                },
                 
            }
        },
    }
);
const enhance = compose(
    withPlansQuery,
    withTableCursors
);
export default enhance(Actionplans);