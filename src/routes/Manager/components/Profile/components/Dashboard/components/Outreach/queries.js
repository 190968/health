
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../../../User/fragments';






export const OutreachInfoFragment = gql`
    fragment OutreachInfo on UserCommunication {
        id
        type
        date
        subject
        participants {
            ...UserInfo
        }
        details
    }
    ${UserInfoFragment}
`;

 const USER_OUTREACH_QUERY = gql`
    query USER_OUTREACH ($userId: UID!, $id: UID!) {
        patient (id: $userId) {
            getCommunication(id:$id) {
                ...OutreachInfo
            }
        }
    }
    ${OutreachInfoFragment}
`;

// 1- add queries:
export const withOutreachQuery = graphql(
    USER_OUTREACH_QUERY,
    {
        options: ({outreach, user}) => {
            return {
                variables: {
                    id: outreach.id,
                    userId: user.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {patient} = data;
            const {getCommunication=ownProps.outreach} = patient || {};
            return {...ownProps, loading: data.loading, outreach:getCommunication}
        },
    }
);

