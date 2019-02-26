
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {branch, compose} from 'recompose';
import { AssessmentSectionPureFragment } from './fragments';

const DELETE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation DELETE_ASSESSMENT_SECTION($id: UID!, $assessmentId: UID!){
        deleteAssessmentSection(id:$id, assessmentId:$assessmentId)
    }
`;
const CREATE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation CREATE_ASSESSMENT_SECTION($input: AssessmentSectionInput!){
        createAssessmentSection(input:$input) {
            ...AssessmentSection
        }
    }
    ${ AssessmentSectionPureFragment }
`;
const UPDATE_ASSESSMENT_SECTION_MUTATION = gql`
    mutation UPDATE_ASSESSMENT_SECTION($id: UID!, $input: AssessmentSectionInput!){
        updateAssessmentSection(id:$id, input: $input) {
            ...CampaignPure
        }
    }
    ${ AssessmentSectionPureFragment }
`;

export const withDeleteAssessmentSectionMutation = graphql(DELETE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps:{section, assessment}, mutate }) => ({
        deleteCampaign: () => {
            return mutate({variables: { id: section.id, assessmentId: assessment.id}});
        },
    }),
});

const withCreateAssessmentSectionMutation = graphql(CREATE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createCampaign: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateAssessmentSectionMutation = graphql(UPDATE_ASSESSMENT_SECTION_MUTATION, {
    props: ({ownProps:{campaign}, mutate }) => ({
        updateCampaign: (input) => {
            return mutate({variables: { id: campaign.id, input}});
        },
    }),
});

const withUpdateAssessmentSectionMutationQuery = compose(
    withCampaignQuery,
    withUpdateAssessmentSectionMutation
);
export const withCreateOrUpdateAssessmentSection = branch(props => props.section, withUpdateAssessmentSectionMutationQuery, withCreateAssessmentSectionMutation);