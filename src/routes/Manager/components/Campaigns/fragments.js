import gql from 'graphql-tag';
import { CohortFragment } from '../Cohorts/fragments';
import { ScreeningPureFragment } from '../Screenings/fragments';
import { UserInfoFragment, PatientInfoFragment } from '../../../User/fragments';
import { PlanCardFragment } from '../../../Plan/components/Plan/fragments';
import { SimpleConnectionFragment } from '../../../../components/FormCustomFields/components/AttachmentsModules/fragments';

export const CampaignPureFragment = gql`
    fragment CampaignPure on Campaign {
        id
        title
        description
        createdOn
        executeDate
        method
        isExecuted
        progress
        status
        subject
        message
    }
`;


export const CampaignFragment = gql`
    fragment Campaign on Campaign {
        ...CampaignPure
        createdBy {
            ...UserInfo
        }
        getCohorts {
            ...Cohort
        }
        getAttachments {
            ...SimpleConnection
        }
        getScreenings {
            ...ScreeningPure
        }
    }
    ${ CampaignPureFragment }
    ${CohortFragment}
    ${ScreeningPureFragment}
    ${UserInfoFragment}
    ${SimpleConnectionFragment}
`;


export const CampaignPopulationFragment = gql`
    fragment CampaignPopulation on CampaignPopulation {
        id
        user {
            ...PatientInfo
        }
        isManually
        isAccepted
        acceptedOn
    }
    ${PatientInfoFragment}
`;