
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { AssessmentSimpleFragment } from './fragments';
import { UserInfoFragment } from '../../routes/User/fragments';
// import {branch, compose} from 'recompose';
// import { AssessmentSectionPureFragment } from './fragments';

// const DELETE_ASSESSMENT_SECTION_MUTATION = gql`
//     mutation DELETE_ASSESSMENT_SECTION($id: UID!, $assessmentId: UID!){
//         deleteAssessmentSection(id:$id, assessmentId:$assessmentId)
//     }
// `;
// const CREATE_ASSESSMENT_SECTION_MUTATION = gql`
//     mutation CREATE_ASSESSMENT_SECTION($input: AssessmentSectionInput!){
//         createAssessmentSection(input:$input) {
//             ...AssessmentSection
//         }
//     }
//     ${ AssessmentSectionPureFragment }
// `;
// const UPDATE_ASSESSMENT_SECTION_MUTATION = gql`
//     mutation UPDATE_ASSESSMENT_SECTION($id: UID!, $input: AssessmentSectionInput!){
//         updateAssessmentSection(id:$id, input: $input) {
//             ...CampaignPure
//         }
//     }
//     ${ AssessmentSectionPureFragment }
// `;

// export const withDeleteAssessmentSectionMutation = graphql(DELETE_ASSESSMENT_SECTION_MUTATION, {
//     props: ({ownProps:{section, assessment}, mutate }) => ({
//         deleteCampaign: () => {
//             return mutate({variables: { id: section.id, assessmentId: assessment.id}});
//         },
//     }),
// });

// const withCreateAssessmentSectionMutation = graphql(CREATE_ASSESSMENT_SECTION_MUTATION, {
//     props: ({ownProps, mutate }) => ({
//         createCampaign: (input) => {
//             return mutate({variables: { input }});
//         },
//     }),
// });

// const withUpdateAssessmentSectionMutation = graphql(UPDATE_ASSESSMENT_SECTION_MUTATION, {
//     props: ({ownProps:{campaign}, mutate }) => ({
//         updateCampaign: (input) => {
//             return mutate({variables: { id: campaign.id, input}});
//         },
//     }),
// });

// const withUpdateAssessmentSectionMutationQuery = compose(
//     withCampaignQuery,
//     withUpdateAssessmentSectionMutation
// );
// export const withCreateOrUpdateAssessmentSection = branch(props => props.section, withUpdateAssessmentSectionMutationQuery, withCreateAssessmentSectionMutation);




const GET_ASSESSMENT_SUMMARY_REPORTS_QUERY = gql`    
    query GET_ASSESSMENT_SUMMARY_REPORTS($id: UID!) {
        getAssessment (id: $id) {
            ...AssessmentSimple
            summaryReports {
                getPatientsReports {
                    totalCount
                    nodes {
                        user {
                            ...UserInfo
                            gender
                            age
                        }
                        getLastUserAssessmentReport {
                            id
                            date
                        }
                        totalReports
                        averageScore
                    }
                }
            }
        }
    }
    ${AssessmentSimpleFragment}
    ${UserInfoFragment}
`;


export const withAssessmentReportsSummaryQuery  = graphql(
    GET_ASSESSMENT_SUMMARY_REPORTS_QUERY,
    {
        skip: (props) =>  {
            const {id} = props.assessment || {};
            return !id;
        },
        options: (ownProps) => {
            const {assessment} = ownProps;
            const {id} = assessment || {};
            return {
                variables: {
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getAssessment} = data || {};
            const {summaryReports} = getAssessment || {};
            const {getPatientsReports} = summaryReports || {};
            const {nodes, totalCount} = getPatientsReports || {};
            return {
                assessmentReports: nodes,
                totalCount: totalCount,
                loading: data.loading,
            }
        },
    }
);