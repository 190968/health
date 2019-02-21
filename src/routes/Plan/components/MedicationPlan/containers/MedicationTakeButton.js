import MedicationTakeButtonPure from '../components/MedicationTakeButton'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withHandlers, withState } from 'recompose';
import { withLoadingButton } from '../../../../../components/Loading';
import { MedicationReportInfoFragment } from '../components/Medication/components/fragments';
import { GET_PATIENT_POINTS_QUERY } from '../../../../../layouts/components/Header/components/RightMenu/containers/HeaderPoints';


const MEDICATION_REPORT_MUTATION = gql`
    mutation medicationReport($id: UID!, $date: Date!, $input: MedicationReportInput!) {
        medicationReport(id:$id, date:$date, input: $input) {
            ...MedicationReportInfo
        }
    }
    ${MedicationReportInfoFragment}
`;

const GET_MEDICATION_QUERY = gql`
    query getMedication($id: UID!, $date: Date!, $userId: UID!) {
        patient (id: $userId)  {
            id
            getMedicationPlan {
                id
                medication (id: $id) {
                    id
                    reports(date:$date)  @connection(key: "medReport", filter: ["date"])   {
                        ...MedicationReportInfo
                    }
                }
            }
        }
    }
    ${MedicationReportInfoFragment}
`;
 
const withMedicationReportMutation = graphql(MEDICATION_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        medicationReport: (input) => {
            const {date, user, medication} = ownProps;
            const {id:userId} = user;
            const {id} = medication;
            return mutate({
                variables: { input: input, date:date, id: id },
                refetchQueries: [{
                    query: GET_MEDICATION_QUERY,
                    variables: {
                        id: id,
                        userId: userId,
                        date:date
                    },
                }, {
                    query: GET_PATIENT_POINTS_QUERY,
                    variables: {
                        userId: userId,
                    },
                }],
            });
        },
    }),
});
  

export const enhanceMedicationReport = compose(
    withMedicationReportMutation,
    withState('loading', 'setLoading', false),
    withState('canUntake', 'setCanUntake', false),
    // withHandlers({
        
    // }),
    withHandlers(({takeMedication}) => {
        let timer = null
        
        return {
            takeMedication: props => (e) => {
                e.preventDefault();
                e.stopPropagation();
                let input = {};//id:report.id
                const {isTaken=false, order, report, medicationPlan} = props;
                const { canReport=false} = medicationPlan || {};
                if (!canReport) {
                    message.warning('No Access to report');
                    return false;
                }
                input.isTaken = !isTaken;
                if (order >= 0) {
                    input.order = order;
                }
                
                if (report) {
                    input.id = report.id;
                }

                if (props.time) {
                    input.time = props.time;
                }
                props.setLoading(true);
                const hide = message.loading('Saving in progress..', 0);
    
                props.medicationReport(input).then(({data}) => {
                    props.setLoading(false);
                    hide();
                    if (data.medicationReport.isTaken) {
                        message.success('Taken');
                        // run 
                        clearTimeout(timer);
                        const delay = 1000*60*5;// for 5 minutes
                        props.setCanUntake(true);
                        timer = setTimeout(() => {
                            props.setCanUntake(false);
                        }, delay);
                    } else {
                        message.info('UnTaken');
                    }

                    }).catch((error) => {
                    message.error(error.message);
                });
            }
        }
    })
)
export const MedicationTakeButton = enhanceMedicationReport(MedicationTakeButtonPure);
 

