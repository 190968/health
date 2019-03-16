import gql from 'graphql-tag';
import { PlanCardFragment } from '../../routes/Plan/components/Plan/fragments';
import { CohortPureFragment } from '../../routes/Manager/components/Cohorts/fragments';
import { PlanFragment } from '../Plan/fragments';

export const BrahmsFragment = gql`
fragment Brahms on Brahms {
    id
    ruleType
    ruleValue
    ruleValueEnd
    ruleValueId
    ruleActionType
    ruleAction {
        ... on BrahmsActionOutput {
            message
            attachments {
                id
                type
                label
                url
                size
            }
        }
        ... on BrahmsActionGoTo {
            goToElementId
        }
        ... on BrahmsActionAp {
            plans {
                ...Plan
            }
        }
        ... on BrahmsActionNotification {
            text
        }
        ... on BrahmsActionCohorts {
            cohorts {
                ...CohortPure
            }
        }
    }
}
${PlanFragment}
${CohortPureFragment}
`;
export const BrahmFragment = gql`
    fragment Brahm on Brahm {
        id
    }
`;

export const BrahmsFullFragment = gql`
    fragment BrahmsFull on Brahms {
        ...Brahms
    }
    ${ BrahmsFragment }
`;

export const BrahmManageFragment = gql`
    fragment ProviderManage on Provider {
        ...Brahm
    }
    ${ BrahmFragment }
`;