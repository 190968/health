import gql from 'graphql-tag';
import { CohortPureFragment } from '../Cohorts/fragments';
import { PatientInfoFragment, UserInfoFragment } from '../../../User/fragments';
import { SimpleConnectionFragment } from '../../../../components/FormCustomFields/components/AttachmentsModules/fragments';

export const ScreeningPureFragment = gql`
    fragment ScreeningPure on Screening {
        id
        title
        status
        executeDate
        progress
        createdOn
        canBeEdited
        isExecuted
    }
`;

export const ScreeningFragment = gql`
    fragment Screening on Screening {
        ...ScreeningPure
        createdBy {
            ...UserInfo
        }
        getCohorts {
            ...CohortPure
        }
        getAttachments {
            ...SimpleConnection
        }
    }
    ${ScreeningPureFragment}
    ${CohortPureFragment}
    ${UserInfoFragment}
    ${SimpleConnectionFragment}
`;

export const ScreeningPopulationFragment = gql`
    fragment ScreeningPopulation on ScreeningPopulation {
        id
        user {
            ...PatientInfo
        }
        isManually
        isAccepted
        acceptedOn
        score
    }
    ${PatientInfoFragment}
`;
