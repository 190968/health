import PeoplePure from '../components/PeopleSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../routes/User/fragments";

export const PEOPLE_LIST_QUERY = gql`
    query GET_PEOPLE_LIST ($search: String, $role: String, $userId: UID) {
        getPeople (search:$search, role:$role, userId:$userId) {
            totalCount
            edges {
                ...UserInfo
            }
        }
    }
    ${UserInfoFragment}
`;

const PeopleWithQuery = graphql(PEOPLE_LIST_QUERY,
    {
        options: (props) => {
            const {role, user} = props;
            return {
                variables: {role, userId: user.id}
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.getPeople.edges,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(PeoplePure);

export default PeopleWithQuery;
export const PeopleSelect = PeopleWithQuery;