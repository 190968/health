
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {branch, compose} from 'recompose';
import { AssessmentSectionPureFragment, AssessmentSectionFragment, AssessmentQuestionFragment } from './fragments';


const DELETE_ASSESSMENT_MUTATION = gql`
    mutation DELETE_ASSESSMENT($id: UID!){
        deleteAssessment(id:$id)
    }
`;


export const withDeleteAssessmentMutation = graphql(DELETE_ASSESSMENT_MUTATION, {
    props: ({ownProps:{ assessment}, mutate }) => ({
        deleteAssessment: () => {
            return mutate({variables: { id: assessment.id}});
        },
    }),
});

const DELETE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation DELETE_ASSESSMENT_SECTION($id: UID!, $assessmentId: UID!){
        deleteAssessmentSection(id:$id, assessmentId:$assessmentId) {
            assessment {
                id
                getSections {
                    ...AssessmentSection
                }
            }
        }
    }
    ${ AssessmentSectionFragment }
`;
const CREATE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation CREATE_ASSESSMENT_SECTION($assessmentId: UID!, $afterSectionId: UID, $input: AssessmentSectionInput!){
        createAssessmentSection(assessmentId: $assessmentId, afterSectionId: $afterSectionId, input:$input) {
            assessment {
                id
                getSections {
                    ...AssessmentSection
                }
            }
        }
    }
    ${ AssessmentSectionFragment }
`;
const UPDATE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation UPDATE_ASSESSMENT_SECTION($id: UID!, $assessmentId: UID!, $input: AssessmentSectionInput!){
        updateAssessmentSection(id:$id, assessmentId:$assessmentId, input: $input) {
            assessmentSection {
                ...AssessmentSectionPure
            }
        }
    }
    ${ AssessmentSectionPureFragment }
`;

export const withDeleteAssessmentSectionMutation = graphql(DELETE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps:{section, assessment}, mutate }) => ({
        deleteAssessmentSection: () => {
            return mutate({variables: { id: section.id, assessmentId: assessment.id}});
        },
    }),
});

const withCreateAssessmentSectionMutation = graphql(CREATE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createAssessmentSection: (input) => {
            const {assessment, afterSection} = ownProps;
            const {id:afterSectionIdId} = afterSection || {};
            return mutate({variables: {assessmentId:assessment.id, afterSectionId:afterSectionIdId, input }});
        },
    }),
});

const withUpdateAssessmentSectionMutation = graphql(UPDATE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps:{section, assessment}, mutate }) => ({
        updateAssessmentSection: (input) => {
            return mutate({variables: { id: section.id, assessmentId: assessment.id, input}});
        },
    }),
});
 
export const withCreateOrUpdateAssessmentSection = branch(props => props.section, withUpdateAssessmentSectionMutation, withCreateAssessmentSectionMutation);

const UPDATE_ASSESSMENT_SECTIONS_ORDER_MUTATION = gql`
    mutation UPDATE_ASSESSMENT_SECTIONS_ORDER($id: UID!,$ids: [UID]!){
        updateAssessmentQuestionOrder(id: $id, ids: $ids) {
            assessmentSection {
                ...AssessmentSection
            }
        }
    }
    ${ AssessmentSectionFragment }
`;

export const withUpdateAssessmentSectionsOrderMutation = graphql(UPDATE_ASSESSMENT_SECTIONS_ORDER_MUTATION, {
    props: ({ownProps:{assessment}, mutate }) => ({
        updateAssessmentSectionsOrder: (ids) => {
            return mutate({variables: { id: assessment.id,  ids}});
        },
    }),
});
// QUESTION //

const DELETE_ASSESSMENT_QUESTION_MUTATION = gql`
    mutation DELETE_ASSESSMENT_QUESTION($id: UID!, $sectionId: UID!){
        deleteAssessmentQuestion(id:$id, sectionId:$sectionId) {
            assessmentSection {
                ...AssessmentSection
            }
        }
    }
    ${ AssessmentSectionFragment }
`;
const CREATE_ASSESSMENT_QUESTION_MUTATION = gql`
    mutation CREATE_ASSESSMENT_QUESTION($assessmentId: UID!, $sectionId: UID!, $input: AssessmentQuestionInput!){
        createAssessmentQuestion(assessmentId:$assessmentId,sectionId: $sectionId, input:$input) {
            assessmentSection {
                ...AssessmentSection
            }
        }
    }
    ${ AssessmentSectionFragment }
`;
const UPDATE_ASSESSMENT_QUESTION_MUTATION = gql`
    mutation UPDATE_ASSESSMENT_QUESTION($assessmentId: UID!, $id: UID!, $input: AssessmentQuestionInput!){
        updateAssessmentQuestion(id:$id, assessmentId: $assessmentId, input: $input) {
            assessmentQuestion {
                ...AssessmentQuestion
            }
        }
    }
    ${ AssessmentQuestionFragment }
`;

const UPDATE_ASSESSMENT_QUESTIONS_ORDER_MUTATION = gql`
    mutation UPDATE_ASSESSMENT_QUESTIONS_ORDER($id: UID!, $sectionId: UID!, $ids: [UID]!){
        updateAssessmentQuestionsOrder(sectionId:$sectionId, id: $id, ids: $ids) {
            assessmentSection {
                ...AssessmentSection
            }
        }
    }
    ${ AssessmentSectionFragment }
`;

export const withUpdateAssessmentQuestionsOrderMutation = graphql(UPDATE_ASSESSMENT_QUESTIONS_ORDER_MUTATION, {
    props: ({ownProps:{assessment, section}, mutate }) => ({
        updateAssessmentQuestionOrder: (ids) => {
            return mutate({variables: { id: assessment.id, sectionId: section.id, ids}});
        },
    }),
});

export const withDeleteAssessmentQuestionMutation = graphql(DELETE_ASSESSMENT_QUESTION_MUTATION, {
    props: ({ownProps:{question, section}, mutate }) => ({
        deleteAssessmentQuestion: () => {
            return mutate({variables: { id: question.id, sectionId: section.id}});
        },
    }),
});

const withCreateAssessmentQuestionMutation = graphql(CREATE_ASSESSMENT_QUESTION_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createAssessmentQuestion: (input) => {
            const {assessment, afterSection, section} = ownProps;
            return mutate({variables: {assessmentId:assessment.id, sectionId:section.id, input }});
        },
    }),
});

const withUpdateAssessmentQuestionMutation = graphql(UPDATE_ASSESSMENT_QUESTION_MUTATION, {
    props: ({ownProps, mutate }) => ({
        updateAssessmentQuestion: (input) => {
            const {assessment, question} = ownProps;
            return mutate({variables: {assessmentId:assessment.id, id: question.id, input}});
        },
    }),
});
 
export const withCreateOrUpdateAssessmentQuestion = branch(props => props.question, withUpdateAssessmentQuestionMutation, withCreateAssessmentQuestionMutation);