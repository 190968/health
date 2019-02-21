
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import DiscussionsList from '../components/DiscussionsList';
import { UserInfoFragment } from '../../../../../../User/fragments';


// import {MedicationPlan} from "../../PlansList/components/MedicationPlan/containers";
const GET_DISCUSSIONS_QUERY  = gql`
 query GET_DISCUSSIONS {
     community {
        getDiscussions {
            edges {
                id
                title
                text
                createdAt
                lastReply {
                    id
                    date
                    text
                    author {
                        ...UserInfo
                    }
                }
                author {
                    ...UserInfo
                }
                category {
                    id
                }
                views
                replies {
                    totalCount
                }
            }
        }
     }
}
${UserInfoFragment}
`;
 
const withQuery = graphql(GET_DISCUSSIONS_QUERY, {
    options: (ownProps) => {

        return   {  
            variables: {
                // id: ownProps.match.params.id,
            },
            // fetchPolicy: 'network-only'
        }},
    props: ({  data }) => {
        const {community} = data;
        const {getDiscussions} = community || {};
        const {edges, totalCount} = getDiscussions || {};

        return {
            discussions: edges,
            total: totalCount,
            loading: data.loading
        }
    },
});
 
export default withQuery(DiscussionsList);