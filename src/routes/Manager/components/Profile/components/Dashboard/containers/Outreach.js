import OutreachPure from '../components/Outreach';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../User/fragments';
import { OutreachInfoFragment } from '../components/Outreach/queries';

const USER_OUTREACH_QUERY = gql`    
    query GET_USER_OUTREACH ($user_id:UID)  {
        patient (id:$user_id) {
            id
            getCommunications {
                totalCount
                edges {
                   ...OutreachInfo 
                }     
            }
        }
    }
    ${UserInfoFragment}
    ${OutreachInfoFragment}
`;

const withQuery = graphql(
    USER_OUTREACH_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user.id,
            }
        }),
        props: ({data}) => {
            const {refetch, patient, loading} = data;
            //console.log(data);
            const {getCommunications} = patient || {};
            const {edges, totalCount} = getCommunications || {};
            return {
                items: edges,
                total: totalCount,
                loading,
                refetch
            }
        },
    }
);



export const Outreach = withQuery(OutreachPure);
export default Outreach;
