import Providers from '../components/Providers';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_PROVIDERS($user_id:UID) {
  patient(id: $user_id) {
     id
     getProviders {
         edges {
            id
            provider {
                id
                name
            }
            sender {
                ...UserInfo
            }
            joinedDate
        }
     }
  }
}

${UserInfoFragment}
`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {getProviders={}} = patient;
        const {edges=[]} = getProviders;

        return {loading: data.loading, providers:edges }
    },
});



const enhance = compose(
    withQuery
);

export default enhance(Providers);