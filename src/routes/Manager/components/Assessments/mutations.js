
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { UserAssessmentReportPureFragment, UserAssessmentReportFragment, UserAssessmentFragment } from './fragments';
import { BrahmsFragment } from '../../../../components/Brahms/fragments';
 
const DELETE_USER_ASSESSMENT_MUTATION = gql`
    mutation DELETE_USER_ASSESSMENT($id: UID!, $userId:UID!){
        deleteUserAssessment(id:$id, userId:$userId)
    }
`;

export const withDeleteUserAssessmentMutation = graphql(DELETE_USER_ASSESSMENT_MUTATION, {
    props: ({ownProps:{userAssessment, user}, mutate }) => ({
        deleteUserAssessment: () => {
            return mutate({variables: { id: userAssessment.id, userId: user.id}});
        },
    }),
});



const CREATE_USER_ASSESSMENT_MUTATION = gql`
    mutation CREATE_USER_ASSESSMENT($id: UID!, $date:Date!){
        createAssessmentReport(userAssessmentId:$id, date:$date) {
            ...UserAssessmentReportPure
        }
    }
    ${UserAssessmentReportPureFragment}
`;

export const withCreateUserAssessmentMutation = graphql(CREATE_USER_ASSESSMENT_MUTATION, {
    props: ({ownProps:{userAssessment, date}, mutate }) => ({
        createUserAssessment: () => {
            return mutate({variables: { id: userAssessment.id, date}});
        },
    }),
});






const ASSESSMENT_REPORT_MUTATION_OLD = gql`
    mutation ASSESSMENT_QUESTION_REPORT($userAssessmentId: UID, $reportId: UID, $date: Date!, $input: [UserAssessmentReportInput]){
        assessmentReport(userAssessmentId: $userAssessmentId, reportId: $reportId, date: $date, input: $input) {
            ...UserAssessmentReport
        }
    }
    ${UserAssessmentReportFragment}
`;

const ASSESSMENT_REPORT_MUTATION = gql`
    mutation ASSESSMENT_QUESTION_REPORT($userAssessmentId: UID, $reportId: UID, $date: Date!, $questionId: UID!, $input: AssessmentQuestionReportInput){
        assessmentQuestionReportPayload(userAssessmentId: $userAssessmentId, reportId: $reportId, questionId: $questionId, date: $date, input: $input) {
            
            assessmentUserReport {
                ...UserAssessmentReport
            }
            brahms {
                ...Brahms
            }
        }
    }
    ${UserAssessmentReportFragment}
    ${BrahmsFragment}
`;


export const withAssessmentReportMutation = graphql(ASSESSMENT_REPORT_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onSubmit: (questionId, input) => {
            const {date, userAssessment, report} = ownProps;
            const {id:reportId} = report || {};
            // console.log(input);

            //getLatestReport(date: $date)
            let extraOpts = {};
            //  console.log(reportId);
            // if (!reportId) {
            //     // if we don't have reportID passed - update latestreport fo the date
            //     console.log(ownProps);
            //     console.log('updating');
            //     extraOpts.update = (store, { data: { assessmentReport } }) => {
            //         console.log(assessmentReport, 'assessmentReport');
            //         if (assessmentReport) {
            //             const {id} = userAssessment || {};
            //             let getReport = false;

            //             const {id:newReportId} = assessmentReport;

            //             if (newReportId && newReportId !== '') {
            //                 getReport = true;
            //             }

            //             const variables = {
            //                 userId: ownProps.user.id,
            //                 id,
            //                 reportId,
            //                 getReport
            //             };

            //             let userAssessmentFromStore = store.readFragment({
            //                 id: 'UserAssessment:' + id, // `id` is any id that could be returned by `dataIdFromObject`.
            //                 fragment: UserAssessmentFragment,
            //                 // fragmentName: "PlanBodyElements",
            //             });
            //             console.log(userAssessmentFromStore);
            //             // // // Read the data from our cache for this query.
            //             // const info = store.readQuery({
            //             //     query: GET_PATIENT_ASSESSMENT_QUERY,
            //             //     variables 
            //             // });
            //             // //console.log(info);
                        

            //             // const {patient} = info || {};
            //             // const {getAssessment} = patient || {};
            //             // //console.log({patient: {...patient, getAssessment: {...getAssessment, getReport:assessmentReport }}});
            //             // store.writeQuery({
            //             //     query: GET_PATIENT_ASSESSMENT_QUERY,
            //             //     data: {patient: {...patient, getAssessment: {...getAssessment, getLatestReport:assessmentReport }}},
            //             //     variables
            //             // });
            //         }
            //     };
            // }

            return mutate({
                variables: { reportId, userAssessmentId: userAssessment.id, date, questionId, input},
                ...extraOpts
            });
        },
    }),
});



const ASSESSMENT_COMPLETE_MUTATION = gql`
    mutation ASSESSMENT_COMPLETE($id: UID, $userAssessmentId: UID, $date: Date!){
        assessmentCompletePayload(id: $id, userAssessmentId:$userAssessmentId, date: $date) {
            assessmentUserReport {
                ...UserAssessmentReportPure
            }
            brahms {
                ...Brahms
            }
        }
    }
    ${UserAssessmentReportPureFragment}
    ${BrahmsFragment}
`;

export const withAssessmentCompleteMutation = graphql(ASSESSMENT_COMPLETE_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onComplete: () => {
            const {date, report, userAssessment} = ownProps;
            const {id:userAssessmentId} = userAssessment || {};
            const {id:reportId} = report || {};
            return mutate({
                variables: {userAssessmentId, id:reportId, date}
            });
        },
    }),
});


