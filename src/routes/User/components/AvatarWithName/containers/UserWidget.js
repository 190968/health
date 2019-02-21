import UserWidgetPure from '../components/UserWidget';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../fragments';


const GET_USER_WIDGET_QUERY  = gql`
 query GET_USER_WIDGET($userId:UID) {
  user(id: $userId) {
    ...UserInfo
    getPossibleRoles
    lastLogin
  }
}
${UserInfoFragment}
`;

const withQuery = graphql(GET_USER_WIDGET_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                userId: ownProps.user.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                user: data.user,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

export const UserWidget = withQuery(UserWidgetPure);
export default UserWidget;