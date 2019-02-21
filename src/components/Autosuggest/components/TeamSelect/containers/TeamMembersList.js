import TeamMembersList from '../components/TeamMembersList';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../routes/User/fragments';

 export const PATIENT_TEAM_MEMBERS_QUERY = gql`
    query GET_PATIENT_TEAM_MEMBERS_LIST ($userId: UID!,$search: String)  {
        patient (id: $userId){
            id
            motivation {
                careTeam (search: $search) {
                    edges {
                        id,
                        user {
                            ...UserInfo
                        }
                    }
                }
            }
        }
    }
    ${UserInfoFragment}
`;

const withQuery = graphql(PATIENT_TEAM_MEMBERS_QUERY,
    {
        options: (ownProps) => {
            const {user} = ownProps;
            const {id:userId} = user || {};
            return {
                skip:!userId,
                variables: {
                    userId
                },
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                const {patient} = data;
                const {motivation} = patient || {};
                const {careTeam} = motivation || {};
                const {edges} = careTeam || {};
                return {
                    items: edges,
                    loading: data.loading,

                    // doSearch(search) {
                    //     return data.fetchMore({
                    //         variables: {
                    //             search: search,
                    //         },
                    //         updateQuery: (previousResult, {fetchMoreResult}) => {
                    //             if (!fetchMoreResult) { return previousResult; }
                    //             return (fetchMoreResult);
                    //         },
                    //     });
                    // }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
);

export default withQuery(TeamMembersList);