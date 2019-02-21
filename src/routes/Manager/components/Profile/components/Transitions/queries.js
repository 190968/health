
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../../../User/fragments';





export const TransitionInfoFragment = gql`
    fragment TransitionInfo on UserTransition {
        id
        transitionType:type
        typeTxt
        dateTime
        notes
        source
        alertEntireTeam
        createdOn
        createdBy {
            ...UserInfo
        }
    }
    ${UserInfoFragment}
`;

export const TRANSITION_QUERY = gql`
    query TRANSITION ($id: UID!) {
        patient {
            getTransition(id:$id) {
                ...TransitionInfo
                getPeopleToAlert {
                    ...UserInfo
                }
            }
        }
    }
    ${TransitionInfoFragment}
    ${UserInfoFragment}
`;

// 1- add queries:
export const withTransitionQuery = graphql(
    TRANSITION_QUERY,
    {
        options: ({transition}) => {
            return {
                variables: {
                    id: transition.id,
                }
            }
        },
        props: ({ ownProps, data }) => {
            const {patient} = data;
            const {getTransition=ownProps.transition} = patient || {};
            return {...ownProps, loading: data.loading, transition:getTransition}
        },
    }
);
