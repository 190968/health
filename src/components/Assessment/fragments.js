import gql from 'graphql-tag';
import { BrahmsFragment } from '../Brahms/fragments';
import { TrackerPureFragment } from '../../routes/Plan/components/BiometricPlan/fragments';


export const AssessmentQuestionFragment = gql`
    fragment AssessmentQuestion on AssessmentQuestion {
        id
        title
        description
        type
        isNumeric
        isOpenended
        isMultiple
        numberAsPrefix
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
        isAnswerBasedQuestion
        getBrahmsRules {
            ...Brahms
        }
        getTracker {
            ...TrackerPure
        }
    }
    ${BrahmsFragment}
    ${TrackerPureFragment}
`;

export const AssessmentSectionPureFragment = gql`
    fragment AssessmentSectionPure on AssessmentSection {
        id
        title
        description
    }
`;

export const AssessmentSectionFragment = gql`
    fragment AssessmentSection on AssessmentSection {
        ...AssessmentSectionPure
        getQuestions {
            ...AssessmentQuestion
        }
    }
    ${AssessmentSectionPureFragment}
    ${AssessmentQuestionFragment}
`;
 



export const AssessmentFragment = gql`
    fragment Assessment on Assessment {
        id
        name
        description
        instructions
        isAllMandatory
        allowGoBack
        showAllQuestions
        showAllSections
        isForm
        showProgress
        showScore
        showBrahms
        showQuestionNumber
        showValidAnswer
        isPrivate
        status
        getSections {
            ...AssessmentSection
        }
        getBrahmsRules {
            ...Brahms
        }
    }
    ${BrahmsFragment}
    ${AssessmentSectionFragment}
`;