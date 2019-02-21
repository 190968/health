import gql from 'graphql-tag';
import { PlanCardFragment } from '../../../Plan/components/Plan/fragments';
import { UserInfoFragment } from '../../../User/fragments';

export const PlanFragment = gql`
    fragment Plan on Plan {
        ...PlanCardInfo

    }
    ${PlanCardFragment}
`;

export const PlanFullFragment = gql`
    fragment PlanFull on Plan {
        ...Plan
        createdOn
        createdBy {
            ...UserInfo
        }
        status
    }
    ${ PlanFragment }
    ${UserInfoFragment}
`;