import AssessementViewPure from '../components/AssessmentView';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withProps, withState, withHandlers} from 'recompose';
import { withModal } from '../../../../../components/Modal';
import { UserInfoFragment } from '../../../../User/fragments';
import { UserAssessmentReportFragment, UserAssessmentFragment } from '../fragments';
import { withCreateUserAssessmentMutation } from '../mutations';

export const GET_PATIENT_ASSESSMENT_QUERY = gql`    
query GET_PATIENT_ASSESSMENT($userId: UID!, $id: UID!, $reportId: UID!, $getReport: Boolean!) {
  patient(id: $userId) {
    id
    getAssessment (id: $id) {
        ...UserAssessment
        getReport (id: $reportId) @include(if: $getReport) {
            ...UserAssessmentReport
        }
      }
    }
}
${UserAssessmentFragment}
${UserAssessmentReportFragment}
${UserInfoFragment}
`;
// @connection(key: "getReportedValues1", filter: ["id"]) 
// 1- add queries:
const withQuery = graphql(
    GET_PATIENT_ASSESSMENT_QUERY,
    {
        options: (ownProps) => {
            const {userAssessment, reportId, date} = ownProps;
            const {id} = userAssessment || {};
            let getReport = false;
            // const {id:reportId} = userAssessmentReport || {};
            if (reportId && reportId !== '') {
                getReport = true;
            }
            return {
                variables: {
                    userId: ownProps.user.id,
                    id,
                    reportId,
                    getReport,
                    date
                },
                // notifyOnNetworkStatusChange:true,
                fetchPolicy: 'network-only',
            }

        },
        props: ({ ownProps, data }) => {

            const {userAssessment:getAssessmentInit} = ownProps;
            const {assessment:assessmentInit} = getAssessmentInit;
            const {patient} = data;
            const {getAssessment} = patient || {};
            const {getReport, assessment} = getAssessment || {};
            
            return {
                userAssessment:{...getAssessmentInit, ...getAssessment},
                assessment: {...assessmentInit, ...assessment},
                report: getReport,
                loading: data.loading,
            }
        },
    }
);

const enhance = compose(
    withState('reportId', 'setReportId', props => {
        const {userAssessment} = props;
        //console.log(props);
        const {getLatestReport} = userAssessment || {};
        const {id=''} = getLatestReport || {};
        return id;
    }),
    withQuery,
    withProps(props => {
       return {
           modalTitle: props.userAssessment.assessment.name,
           modalWidth: 900,
           modalFooter: false
       }
    }),
    withModal,
    withCreateUserAssessmentMutation,
    withHandlers({
        handleNewReport: props => () => {

            props.createUserAssessment().then(({data}) => {
                const {createAssessmentReport} = data;
                props.setReportId(createAssessmentReport.id);
            });
            // props.setReportId('');
        }
    }),
)

export const AssessementView = enhance(AssessementViewPure);

export default AssessementView;