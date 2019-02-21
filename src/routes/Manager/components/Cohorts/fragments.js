import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';

export const CohortPureFragment = gql`
    fragment CohortPure on Cohort {
        id
        title
        description
        createdOn
    }
`;

export const UserCohortPureFragment = gql`
    fragment UserCohortPure on UserCohort {
        id
        startDate
        role
    }
`;

export const CohortUsersFragment = gql`
    fragment CohortUsers on Cohort {
        getCohortUsers {
            edges {
                ...UserCohortPure
                user {
                    ...UserInfo
                }
            }
            totalCount
        }
    }
    ${UserCohortPureFragment}
    ${UserInfoFragment}
`;

export const CohortFragment = gql`
    fragment Cohort on Cohort {
        ...CohortPure
        gender
        ages {
            min
            max
        }
        ...CohortUsers
        getCohortManagers {
            edges {
                ...UserCohortPure
                user {
                    ...UserInfo
                }
            }
            totalCount
        }
        codes {
            id
            code
            name
        }

    }
    ${CohortPureFragment}
    ${CohortUsersFragment}
    ${UserCohortPureFragment}
   
`;