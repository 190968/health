import Family from '../components/Family';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_FAMILY_QUERY  = gql`
 query GET_USER_family($user_id:UID) {
  patient(id: $user_id) {
     id
     motivation {
            family {
                totalCount,
                edges{
                    id,
                    user {
                        ...UserInfo
                        phoneFormatted
                    }
                    joinedDate
                    roleText
                    canReport
                }
            }
     }
  }
}

${UserInfoFragment}
`;

const withQuery = graphql(GET_FAMILY_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {motivation={}} = patient;
        const {family={}} = motivation;
        const {edges=[]} = family;

        return {loading: data.loading, members:edges }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(Family);