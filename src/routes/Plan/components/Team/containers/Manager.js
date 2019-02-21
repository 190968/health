import Manager from '../components/Manager';
import { compose, withHandlers } from 'recompose';
import { withDrawer } from '../../../../../components/Modal';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { UserPlanOnlyUserFragment } from '../../Plan/fragments';

export const GET_USER_PLAN_TEAM_QUERY = gql`
    query GET_USER_PLAN_TEAM ($id: UID!) {
        getUserPlan (id:$id) {
            id
            getMembers {
                ...UserPlanOnlyUser
                role
            }
          }
    }
    ${UserPlanOnlyUserFragment}
`;

const withQuery = graphql(
    GET_USER_PLAN_TEAM_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.userPlan.id,
            }
        }),
        props: ({data}) => {
            const {getMembers=[]} = data.getUserPlan || {};

            return {
                members: getMembers,
                refetch: data.refetch,
                loading: data.loading,
            }
        },
    }
);


const enhance = compose(
    withQuery,
    withDrawer
);
export const PlanTeamManager = enhance(Manager);