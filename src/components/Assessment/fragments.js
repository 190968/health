import gql from 'graphql-tag';
import { BrahmsFragment } from '../Brahms/fragments';


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
    }
    ${BrahmsFragment}
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