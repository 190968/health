import OutreachPure from '../components/Outreach';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../User/fragments';

const USER_OUTREACH_QUERY = gql`    
    query GET_USER_OUTREACH ($user_id:UID)  {
        patient (id:$user_id) {
            id
            getOutreach {
                totalCount
                edges {
                    id
                    type
                    date
                    subject
                    participants {
                        ...UserInfo
                    }
                    details
                }     
            }
        }
    }
    ${UserInfoFragment}
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
            //console.log(data);
            if (!data.loading) {
                const {edges, totalCount} = data.patient.getOutreach;
                return {
                    items: edges,
                    total: totalCount,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export const Outreach = withQuery(OutreachPure);
export default Outreach;
