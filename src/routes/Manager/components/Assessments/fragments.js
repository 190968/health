import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';

export const UserAssessmentReportPureFragment = gql`
    fragment UserAssessmentReportPure on UserAssessmentReport {
        id
        progress
        isCompleted
        completedDate
        date
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


export const AssessmentFragment = gql`
    fragment Assessment on Assessment {
        id
        name
        isAllMandatory
        allowGoBack
        showAllQuestions
        showAllSections
        isForm
        getSections {
            id
            title
            description
            getQuestions {
                id
                title
                description
                type
                isNumeric
                isOpenended
                isMultiple
                getAnswers {
                    id
                    idForReported
                    label
                    isCritical
                    isValidAnswer
                    points
                    nextQuestionId
                    nextQuestion {
                        id
                    }
                    finishAssessment
                }
            }
        }
    }
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
`;
