import CareTeam from '../components/CareTeam';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../fragments';
const ACCOUNT_CARETEAM_QUERY  = gql`
   query GET_CARETEAM {
        account {
            user {
                id
                motivation {
                    careTeam {
                        totalCount,
                        edges {
                            id
                            user {
                                ...UserInfo
                            }
                        }
                    }
                }
            }
         }
     }
     ${UserInfoFragment}
`;
const withMutation = graphql(ACCOUNT_CARETEAM_QUERY, {
    props: ({ data }) => {

        const {account} = data;
        const {user} = account || {};
        const {motivation} = user || {};
        const {careTeam} = motivation || {};
        const {edges=[], totalCount=0} = careTeam || {};
        return {
            members: edges,
            totalCount: totalCount,
            loading: data.loading
        }
    }
});

export default withMutation(CareTeam);