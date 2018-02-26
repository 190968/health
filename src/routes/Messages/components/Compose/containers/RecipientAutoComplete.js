import RecipientAutoComplete from '../components/RecipientAutoComplete'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import Medication from '../components/Medication/components';
// Query for grabbing everything for the dashboard items
export const participantsList_QUERY = gql`
    query GET_PARTICIPANTS_LIST ($search: String)  {
        account {
            getInboxParticipants (search: $search) {
                user {
                    id
                    fullName
                }
                isDND
            }
        }
    }
`;


const withQuery = graphql(participantsList_QUERY,
    {
        options: () => {
            return {
                //skip:true,
                variables: {
                    search:''
                },
                fetchPolicy: 'network-only'
            }},
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    participants: data.account.getInboxParticipants,
                    loading: data.loading,

                    search(search) {
                        //console.log(search);
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    getInboxParticipants: [...previousResult.getInboxParticipants, ...fetchMoreResult.getInboxParticipants]
                                });
                            },
                        });
                    }

                }

            } else {
                return {loading: data.loading, participants:[]}
            }
        },

    }
)(RecipientAutoComplete);


export default withQuery;