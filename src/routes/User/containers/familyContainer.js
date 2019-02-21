import Family from '../components/Family';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../fragments';


export const GET_FAMILY_QUERY  = gql`
   query GET_FAMILY {
        account {
            user {
                id
                motivation{
                    family {
                        totalCount,
                        edges{
                            id,
                            user {
                                ...UserInfo
                                email
                            }
                        }
                    }
                }
            }
         }
     }
     ${UserInfoFragment}
`;

const withQuery = graphql(GET_FAMILY_QUERY, {
    props: ({  data }) => {
        const {account} = data;
        const {user} = account || {};
        const {motivation} = user || {};
        const {family} = motivation || {};
        const {edges=[], totalCount=0} = family || {};
        return {
            members: edges,
            totalCount: totalCount,
            loading: data.loading
        }
    },
});
export default withQuery(Family);