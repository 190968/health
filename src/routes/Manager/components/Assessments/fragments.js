import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';
import { BrahmsFragment } from '../../../../components/Brahms/fragments';
import { AssessmentSectionFragment, AssessmentFragment as AssessmentFragmentInit } from '../../../../components/Assessment/fragments';

export const UserAssessmentReportPureFragment = gql`
    fragment UserAssessmentReportPure on UserAssessmentReport {
        id
        progress
        isCompleted
        completedDate
        date
        points
        maxPoints
        completedBy {
            ...UserInfo
        }
    }
    ${UserInfoFragment}
`;

export const UserAssessmentReportFragment = gql`
    fragment UserAssessmentReport on UserAssessmentReport {
        ...UserAssessmentReportPure
        getReportedValues {
            id
            questionId
            answerId
            value
            isValid
            isCritical
            points
        }
    }
    ${UserAssessmentReportPureFragment}
`;



export const AssessmentFragment = AssessmentFragmentInit;

export const UserAssessmentPureFragment = gql`
fragment UserAssessmentPure on UserAssessment {
    id
    createdOn
    startTime
    startDate
    endDate
    repeatedDays
    comments
    canReport
    user {
        ...UserInfo
    }
    assessment {
        ...Assessment
    }
}
${AssessmentFragment}
${UserInfoFragment}
`;


export const UserAssessmentFragment = gql`
fragment UserAssessment on UserAssessment {
    id
    createdOn
    startTime
    startDate
    endDate
    repeatedDays
    comments
    canReport
    user {
        ...UserInfo
    }
    assessment {
        ...Assessment
    }
    getLatestReport @skip(if: $getReport) {
        ...UserAssessmentReport
    }
}
${AssessmentFragment}
${UserInfoFragment}
${UserAssessmentReportFragment}
`;
