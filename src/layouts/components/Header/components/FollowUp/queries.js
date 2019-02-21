import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { UserInfoFragment } from "../../../../../routes/User/fragments";

const GET_FOLLOW_UPS_QUERY = gql`    
    query GET_FOLLOW_UPS {
        management{
            getFollowUps {
                id
                title
                dateTime
                user {
                    ...UserInfo
                }
                isAccepted
            }
        }
    }
    ${UserInfoFragment}
`;

export const withFollowUpsQuery = graphql(
    GET_FOLLOW_UPS_QUERY,
    {
        options: (ownProps) => {
            // const {userAssessment} = ownProps;
            // const {id} = userAssessment || {};
            return {
                // variables: {
                //     userId: ownProps.user.id,
                //     id,
                // },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {

            const {getFollowUps=[]} = data.management || {};
            return {
                followUps: getFollowUps,
                total: getFollowUps.length,
                loading: data.loading,
                refetch:data.refetch
            }
        },
    }
);